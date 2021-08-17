module.exports = async function (payload, ctx) {
   if (ctx.local.has("model", payload.model)) {
      let model = ctx.local.get("model", payload.model)
      if (!model.methods.has(payload.method)) {
         payload.response.warnings.push("Missing method: " + payload.method)
         return false
      } //TODO BUrası hata veriyor valid_payload return false
   } else {
      payload.response.warnings.push("Missing model: " + payload.model)
      return false
   }

   let arr = ctx.helpers.defaultArrayCalc(payload, "preRule");
   if (arr.every((i) => ctx.local.has("rule", i))) {
      for (let i of arr) {
         let start = Date.now()
         let res = await ctx.local.get("rule", i).function(payload, ctx);
         payload.metrics.lifecycle_response_times.push({
            name: i,
            time: Date.now() - start
         })
         if (res == false) {
            payload.response.warnings.push(`false preRule: ${i}`);
            return false;
         }
      }
      return true;
   } else {
      payload.response.status = 400
      payload.response.warnings.push(`Missing preRule: ` + ctx.lodash.remove(rules, r => !ctx.local.has("rule", r)));
      return false
   }
};
