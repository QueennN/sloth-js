module.exports = async function(ctx){
    ctx.prometheus.collectDefaultMetrics()
    ctx.metrics = {}
    ctx.metrics.request = new ctx.prometheus.Counter({name:"request",help:"request counter"})

    ctx.app.get("/metrics", async (req, res) => {
        res.status(200).json(await ctx.prometheus.register.metrics())
    })
}