module.exports = async (payload, ctx) => {
    ctx.metrics.response_time.labels(payload.model,payload.method).observe(Date.now() - ctx.metrics.start)
}
