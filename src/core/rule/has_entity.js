module.exports = {
   name: "has_entity",
   function: async function (payload, ctx) {
      let model = ctx.local.get("model",payload.model);
      let keys = ctx.lodash.keys(payload.body);
      for (let key of keys) {
         if (model.schema[key].relation) {
            let res = await ctx.run({
               system: true,
               model: model.schema[key].relation,
               method:"count",
               query: {
                  pk: payload.body[key]
               },
            })
            if (!res) return false
         }
      }
      return true
   }
}

