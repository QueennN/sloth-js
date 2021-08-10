module.exports = {
   name: "simplified",
   //TODO Boş fieldleri doldur.
   function: async function (payload, ctx) {
      if (ctx.lodash.has(payload.options, "simplified") && payload.options.simplified == true) {
         if (ctx.lodash.isArray(payload.response.data)) {
            payload.response.data = payload.response.data.map(data => ctx.lodash.values(ctx.lodash.cloneDeep(data)));
         } else {
            payload.response.data = ctx.lodash.values(payload.response.data);
         }
      }
   }
}

