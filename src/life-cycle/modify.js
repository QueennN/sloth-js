module.exports = async function (payload, ctx) {
   let arr = ctx.helpers.defaultArrayCalc(payload, "modify");
   if (
      arr.every(function (e) {
         return ctx.modifies.has(e);
      })
   ) {
      for (let m of arr) {
         let start = Date.now()         
         await ctx.modifies.get(m)(payload, ctx);
         ctx.metrics.fookie_lifecycle_function_time.labels("modify",m).observe(Date.now()-start)
      }
   } else {
      throw Error("Missing modify");
   }
};
