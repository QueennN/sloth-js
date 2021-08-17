module.exports = {
   name: "set_default",
   function: async function (payload, ctx) {
      let model = ctx.local.get("model", payload.model)
      let defaults = ctx.lodash.mapValues(model.schema, o => o.default)
      defaults = ctx.lodash.pickBy(defaults, v => !ctx.lodash.isUndefined(v))
      payload.body = ctx.lodash.defaults(payload.body, defaults)    
 
   }
}

