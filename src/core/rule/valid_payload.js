module.exports = {
   name: "valid_payload",
   function: async function (payload, ctx) {
      let avaible_keys = [
         "method",
         "model",
         "options",
         "system",
         "token",
         "body",
         "query",
         "attributes",
         "projection",
         "response",
         "metrics",
      ]
      return ctx.lodash.without(ctx.lodash.keys(payload), ...avaible_keys).length === 0
   }
}

