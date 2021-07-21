module.exports = async function (payload, ctx) {
   let rules = await ctx.helpers.defaultArrayCalc(payload, "rule");
   if (rules.every((i) => ctx.rules.has(i))) {
      for (let rule of rules) {
         let start = Date.now()
         let res = await ctx.rules.get(rule)(payload, ctx);
         ctx.metrics.fookie_lifecycle_function_time.labels("filter",rule).observe(Date.now()-start)
         if (res == false) {
            payload.response.warnings.push(`false rule: ${rule}`);
            return false;
         }
      }

      return true;
   } else {
      payload.response.warnings.push("invalid rule", rules);
   }
};
