module.exports = {
   name: "valid_payload",
   function: async function (payload, ctx) {
      let avaible_keys = ["method", "model", "options", "system", "token", "body", "query", "attributes", "projection", "response"]
      let keys = ctx.lodash.keys(payload)


      return ctx.lodash.without(keys, ...avaible_keys).length === 0
   }
}

