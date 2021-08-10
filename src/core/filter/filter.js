module.exports = {
   name: "filter",
   function: async function (payload, ctx) {
      let option_method = "read"
      if (["update", "create"].includes(payload.options.method)) {
         option_method = "write"
      }
      let model = ctx.local.get("model", payload.model);
      for (let field of ctx.lodash.keys(model.schema)) {
         let roles = model.schema[field][option_method]
         let show = true;
         for (let role of roles) {
            show = show && (await ctx.local.get("role", role).function(payload, ctx));
         }
         if (!show) {
            if (ctx.lodash.isArray(payload.response.data)) {
               payload.response.data = payload.response.data.map(i => ctx.lodash.omit(i, [field]))
            } else {
               payload.response.data = ctx.lodash.omit(payload.response.data, [field])
            }

         }
      }
   }
}

