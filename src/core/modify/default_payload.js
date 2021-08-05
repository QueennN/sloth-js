module.exports = {
   name: "default_payload",
   function: async function (payload, ctx) {
      payload = ctx.lodash.merge(payload, {
         options: {},
         body: {},
         query: {},
         projection: {}
      })
      payload.response = {
         data: undefined,
         warnings: [],
         status: 200,
      }
   }
}

