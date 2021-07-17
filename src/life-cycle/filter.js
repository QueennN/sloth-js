module.exports = async function (payload, ctx) {
   let filters = await ctx.helpers.defaultArrayCalc(payload, "filter");
   if (filters.every((i) => ctx.store.get("filter").has(i))) {
      for (let i of store.filter) {
         await ctx.store.get("filter").get(i)(payload, ctx);
      }
   } else {
     payload.response.warnings.push("Missing Filter")
   }
};
