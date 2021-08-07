module.exports = async function (payload, ctx) {
   let arr = ctx.helpers.defaultArrayCalc(payload, "modify");
   if (arr.every((e) => ctx.local.has("modify", e))) {
      for (let m of arr) {
         let start = Date.now()
         await ctx.local.get("modify", m).function(payload, ctx);
         ctx.metrics.fookie_lifecycle_function_time.labels("modify", m).observe(Date.now() - start)
      }
   } else {
      payload.response.status = 400
      payload.response.warnings.push(`Missing modify: ` + ctx.lodash.remove(arr, i => !ctx.local.has("modify", i)));
   }
};
