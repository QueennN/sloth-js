module.exports = {
   name: "need_target",
   function: async function (payload, ctx) {
      let res = await ctx.run({
         system:true,
         model:payload.model,
         method:"count",
         query:payload.query
      })
     return res.data > 0
   }
}

