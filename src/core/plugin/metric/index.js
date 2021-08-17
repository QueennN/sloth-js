module.exports = async function (ctx) {
    //ctx.prometheus.collectDefaultMetrics()
    ctx.metrics = {
        request_count: 0,
    }

    //ctx.metrics.request = new ctx.prometheus.Counter({name:"fookie_request",help:"request counter"})
    /*
        ctx.metrics.response_time  = new ctx.prometheus.Summary({  
            name: 'fookie_response_time',
            help: 'Response time in millis',
            labelNames: ['model', 'method']
        });
    
    
        ctx.metrics.fookie_lifecycle_function_time  = new ctx.prometheus.Summary({  
            name: 'fookie_lifecycle_function_time',
            help: 'Response time for lifecycle methods.',
            labelNames: ['step', 'function_name']
        });
    
        ctx.app.get("/metrics", async (req, res) => {
            res.status(200).end(await ctx.prometheus.register.metrics())
        })
        */
}