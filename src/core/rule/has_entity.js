module.exports = {
   name: "has_entity",
   function: async function (payload, ctx) {
      let model = ctx.local.get("model",payload.model);
      let keys = ctx.lodash.keys(payload.body);
      for (let key of keys) {
         if (model.schema[key].relation) {
            let res = await tx.run({
               system: true,
               model: model.schema[key].relation,
               query: {
                  [model.database.pk]: payload.body[key]
               },
               key: payload.body[key]
            })
            if (!res) return false
         }
      }
      return true
   }
}

