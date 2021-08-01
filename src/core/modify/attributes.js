module.exports = {
   name: "attributes",
   function: async function (payload, ctx) {
      let model = ctx.local.get("model",payload.model);
      let database = ctx.local.get("database",model.database)
      if (!ctx.lodash.has(payload, "attributes") || payload.attributes.length == 0) {
         payload.attributes = ctx.lodash.keys(model.schema)
      }

      for (let field of payload.attributes) {
         let roles = model.schema[field].read;
         let show = true;
         for (let role of roles) {
            show = show && (await ctx.roles.get(role)(payload));
         }
         if (!show) {
            payload.attributes = ctx.lodash.remove(payload.attributes, (f) => f != field);
         }
      }
      payload.attributes = [database.pk].concat(payload.attributes)
   }
}

