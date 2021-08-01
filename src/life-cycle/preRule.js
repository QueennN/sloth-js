module.exports = async function (payload, ctx) {
  
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
      payload.response.warnings.push(`Missing preRule`, rules);
      return false
   }
};
