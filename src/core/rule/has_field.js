module.exports = {
   name: "has_field",
   function: async  function (payload, ctx) {
      let body_keys = ctx.lodash.keys(payload.body)
      let schema_keys = ctx.lodash.keys(ctx.models.get(payload.model).schema)
      return body_keys.every((k) => schema_keys.includes(k))
   }
}
