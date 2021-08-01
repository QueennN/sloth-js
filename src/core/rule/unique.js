
module.exports = {
   name: "unique",
   function: async function (payload, ctx) {
      let model = ctx.local.get("model",payload.model);
      let fields = ctx.lodash.keys(payload.body);
      for (let field of fields) {
         if (model.schema[field].unique) {
            let res = await ctx.run({
               system: true,
               method: "count",
               model: payload.model,
               query: {
                  [field]: payload.body[field],
               },
            });
            if (res.data > 0) payload.response.warnings.push("not unique: " + field);
            return res.data == 0;
         }
      }
   }
}

