module.exports = {
   name: "set_default",
   function: async function (payload, ctx) {
      let keys = ctx.lodash.keys(ctx.local.get("model",payload.model).schema);
      keys = keys.filter((k) => ctx.local.get("model",payload.model).schema[k].default);
      keys.forEach((k) => {
         if (payload.body[k] == undefined) {
            payload.body[k] = ctx.local.get("model",payload.model).schema[k].default;
         }
      });
   }
}

