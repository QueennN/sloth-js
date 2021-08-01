module.exports = async function (ctx) {
    ctx.local = {
        get: function (model, name) {
            return ctx.lodash.find(ctx.store.get(model), { name })
        },
        has: function (model, name) {
            return true
            return ctx.lodash.has(ctx.store.get(model), { name })
        },
        set: function (model,declaration) {
            return ctx.store.get(model).push(declaration)
        },

    }
}