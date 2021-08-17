module.exports = async function (payload, ctx) {
   let arr = ctx.helpers.defaultArrayCalc(payload, "modify");
   if (arr.every((e) => ctx.local.has("modify", e))) {
      for (let m of arr) {
         let start = Date.now()
         await ctx.local.get("modify", m).function(payload, ctx);
         payload.metrics.lifecycle_response_times.push({
            name: m,
            time: Date.now() - start
         })
      }
   } else {
      payload.response.status = 400
      payload.response.warnings.push(`Missing modify: ` + ctx.lodash.remove(arr, i => !ctx.local.has("modify", i)));
   }
};
