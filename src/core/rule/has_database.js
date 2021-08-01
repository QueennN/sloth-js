module.exports = {
   name: "has_database",
   function: async function (payload, ctx) {
      return ctx.local.has("database",payload.body.database)
   }
}
