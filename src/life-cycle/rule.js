module.exports = async function (payload, ctx) {
   let rules = await ctx.helpers.defaultArrayCalc(payload, "rule");
   if (rules.every((i) => ctx.local.has("rule",i))) {
      for (let rule of rules) {
         let start = Date.now()
         let res = await ctx.local.get("rule",rule).function(payload, ctx);
         ctx.metrics.fookie_lifecycle_function_time.labels("filter",rule).observe(Date.now()-start)
         if (res == false) {
            payload.response.warnings.push(`false rule: ${rule}`);
            return false;
         }
      }

      return true;
   } else { 
      payload.response.warnings.push("Missing", rules);
      throw Error("Missing rule")
      return false
   }
};
