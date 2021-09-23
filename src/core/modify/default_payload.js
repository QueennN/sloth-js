module.exports = {
   name: "default_payload",
   function: async function (payload, ctx) {
      payload = ctx.lodash.merge(payload, {
         options: {},
         body: {},
         query: {},
         projection: {},
         metrics: {
            lifecycle_response_times: [],
            response_time: 0,
            start: Date.now(),
         },
      })
      payload.response = {
         data: undefined,
         warnings: [],
         status: true,
      }
      if (!payload.projection.offset) {
         payload.projection.offset = 0
      }
      if (!payload.projection.limit) {
         payload.projection.limit = Infinity
      }
   }
}

