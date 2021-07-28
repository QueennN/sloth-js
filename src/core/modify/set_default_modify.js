module.exports = {
   //TODO BÖYLE BİŞE YOK
   name: "set_default_modify",
   function: async function (payload, ctx) {
      let keys = ctx.lodash.keys(ctx.models.get(payload.model).schema);
      keys = keys.filter((k) => ctx.models.get(payload.model).schema[k].default);
      keys.forEach((k) => {
         let modify = await ctx.run({
            system: true, model: "modify", method: "get", query: {
               name: ctx.models.get(payload.model).schema[k].default
            }
         })
         if (body[k] == undefined) {
            body[k] = modify(payload, ctx);
         }
      });
   }
}

