module.exports = function (payload, ctx) {
   let keys = ctx.lodash.keys(ctx.store.get("model").get(payload.model).schema);
   keys = keys.filter((k) => ctx.store.get("model").get(payload.model).schema[k].default);
   keys.forEach((k) => {
      if (payload.body[k] == undefined) {
         payload.body[k] = ctx.store.get("model").get(payload.model).schema[k].default;
      }
   });
};
