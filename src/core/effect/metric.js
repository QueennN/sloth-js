module.exports = {
    name: "metric",
    function: async (payload, ctx) => {
        payload.metrics.response_time = Date.now() - payload.metrics.start
    }
}


