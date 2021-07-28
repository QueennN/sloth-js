module.exports = {
   name: "loggedIn",
   function: async function (payload, ctx) {
      return ctx.lodash.has(payload, 'user')
   }
}
