module.exports = {
   name: "admin",
   function: async function (payload, ctx) {
      if (!ctx.lodash.has(payload, "user")) return false;
      let res = await ctx.run({
         system: true,
         model: "admin",
         method: "count",
         query: {
            user: payload.user._id,
         },
      });
      let count = res.data;
      return count >= 1;
   }
}



