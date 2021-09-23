
module.exports = {
   name: "unique",
   function: async function (payload, ctx) {
      let trash_old = payload.method == "post" ? 0 : 1
      let model = ctx.local.get("model", payload.model);
      let fields = ctx.lodash.keys(payload.body);
      for (let field of fields) {
         if (model.schema[field].unique) {
            let res = await ctx.run({
               system: true,
               model: payload.model,
               method: "count",
               query: {
                  [field]: payload.body[field],
               },
            });
            if (res.data > trash_old) {
               payload.response.warnings.push("not unique: " + field);
               return false
            }
         }
      }
      return true
   }
}

