module.exports = async function (payload, ctx) {
   if (ctx.local.has("model", payload.model)) {
      let model = ctx.local.get("model", payload.model)
      if (!model.methods.has(payload.method)) {
         payload.response.warnings.push("Missing method: "+payload.method)
         return false
      } //TODO BUrası hata veriyor valid_payload return false
   } else {
      payload.response.warnings.push("Missing model: "+payload.model)
      return false
   }

   let rules = ctx.helpers.defaultArrayCalc(payload, "preRule");
   if (rules.every((rule) => ctx.local.has("rule", rule))) {
      for (let rule of rules) {
         let start = Date.now()
         let res = await ctx.local.get("rule", rule).function(payload, ctx);
         ctx.metrics.fookie_lifecycle_function_time.labels("filter", rule).observe(Date.now() - start)
         if (res == false) {
            payload.response.warnings.push(`false preRule: ${rule}`);
            return false;
         }
      }
      return true;
   } else {
      payload.response.status = 400
      payload.response.warnings.push(`Missing preRule: `+ ctx.lodash.remove(rules, r => !ctx.local.has("rule", r)));
      return false
   }
};
