module.exports = function (payload, ctx) {
   console.log(ctx.lodash.keys(payload.body));
   return ctx.lodash.keys(payload.body).every((k) => ctx.lodash.keys(ctx.models.get(payload.model).schema).includes(k));
};
