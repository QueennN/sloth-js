module.exports = {
   name: "attributes",
   function: async function (payload, ctx) {
      /*
      TODO Burayı bir çöz.
      Karmaşık duruyor ve rolleri tekrar tekrar hesaplamak yerine belki kabul edilen
      roller diye payload eklenebilir. 
      Düşün.
       */
      let model = ctx.local.get("model", payload.model);
      let database = ctx.local.get("database", model.database)

      if (!ctx.lodash.has(payload, "attributes") || payload.attributes.length == 0) {
         payload.attributes = ctx.lodash.keys(model.schema)
      }

      for (let field of payload.attributes) {
         let roles = model.schema[field].read;
         let show = true;
         for (let role of roles) {
            show = show && (await ctx.local.get("role", role).function(payload, ctx));
         }
         if (!show) {
            payload.attributes = ctx.lodash.remove(payload.attributes, (f) => f != field);
         }
      }
      payload.attributes = [database.pk].concat(payload.attributes)
   }
}

