module.exports = async function (payload, ctx) {
    console.log(1);
    ctx.store.get("model").set(payload.body.name,payload.body)
    ctx.store.get("model").get(payload.body.name).methods = {}
    await ctx.database.get(payload.body.database).modify(payload, ctx)
}