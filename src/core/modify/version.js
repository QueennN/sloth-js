module.exports = {
   name: "version",
   function: async function (payload, ctx) {
      if (payload.options.version) {
         payload.query.version = ctx.package.version;
      }
      if (payload.method == "create") {
         if (!ctx.lodash.has(payload.body, "version")) {
            payload.body.version = ctx.package.version;
         }
      }
   }
}

