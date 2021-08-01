module.exports = async function (payload, ctx) {
   let arr = ctx.helpers.defaultArrayCalc(payload, "modify");
   if (
      arr.every(function (e) {
         return ctx.local.has("modify", e);
      })
   ) {
      for (let m of arr) {
         let start = Date.now()
         await ctx.local.get("modify", m).function(payload, ctx);
         ctx.metrics.fookie_lifecycle_function_time.labels("modify", m).observe(Date.now() - start)
      }
   } else {
      throw Error("Missing modify");
   }
};
