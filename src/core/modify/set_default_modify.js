module.exports = {
   //TODO BÖYLE BİŞE YOK. SİSTEME EKLİ DEĞİL
   // Burası yerine values diye bir core model oluşturulabilir.
   name: "set_default_modify",
   function: async function (payload, ctx) {
      let keys = ctx.lodash.keys(ctx.local.get("model",payload.model).schema);
      keys = keys.filter((k) => ctx.local.get("model",payload.model).schema[k].default);
      keys.forEach((k) => {
         let modify = await ctx.run({
            system: true, model: "modify", method: "get", query: {
               name: ctx.local.get("model",payload.model).schema[k].default
            }
         })
         if (body[k] == undefined) {
            body[k] = modify(payload, ctx);
         }
      });
   }
}

