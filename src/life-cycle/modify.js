module.exports = async function (payload, ctx) {
   let arr = ctx.helpers.defaultArrayCalc(payload, "modify");
   if (
      arr.every(function (e) {
         return ctx.store.get("modify").has(e);
      })
   ) {
      for (let m of arr) {
         await ctx.store.get("modify").get(m)(payload, ctx);
      }
   } else {
      throw Error("Missing modify");
   }
};
