module.exports = function (payload, ctx) {
   let keys = ctx.lodash.keys(ctx.store.get("model").get(payload.model).schema);
   keys = keys.filter((k) => ctx.store.get("model").get(payload.model).schema[k].default);
   keys.forEach((k) => {
      let modify = ctx.store.get("modify").get(ctx.store.get("model").get(payload.model).schema[k].default);
      if (body[k] == undefined) {
         body[k] = modify(payload, ctx);
      }
   });
};
