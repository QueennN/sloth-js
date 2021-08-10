module.exports = {
    name: "metric",
    function: async (payload, ctx) => {
        return
        ctx.metrics.response_time.labels(payload.model || "model", payload.method || "get").observe(Date.now() - ctx.metrics.start)
    }
}


