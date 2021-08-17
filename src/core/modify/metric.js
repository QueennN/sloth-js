module.exports = {
   name: "metric",
   function: async function (payload, ctx) {
      ctx.metrics.request_count++
      payload.metrics.start = Date.now()
   }
}

