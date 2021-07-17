module.exports = async function (ctx) {
    ctx.model = async function(model){
        await ctx.run({
            system: true,
            model: "model",
            method: "post",
            body: model
        })
    }  
}