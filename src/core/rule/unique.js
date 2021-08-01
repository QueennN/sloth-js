
module.exports = {
   name: "unique",
   function: async function (payload, ctx) {
      return true //TODO
      let model = ctx.local.get("model",payload.model);
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
            if (res.data > 0) payload.response.warnings.push("not unique: " + field);
            return res.data == 0;
         }
      }
   }
}

