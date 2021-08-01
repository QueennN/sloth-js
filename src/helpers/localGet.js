module.exports = async function (ctx) {
    ctx.local = {
        get: function (model, name) {
            return ctx.lodash.find(ctx.store.get(model), { name })
        },
        has: function (model, name) {
            return ctx.lodash.filter(ctx.store.get(model), { name }).length > 0
        },
        set: function (model, declaration) {
            this.delete(model,declaration.name)
            return ctx.store.get(model).push(declaration)
        },
        delete: function (model, name) {
            ctx.store.set(model, ctx.lodash.filter(ctx.store.get(model), a => a.name != name))
        },


    }
}