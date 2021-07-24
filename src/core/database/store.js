module.exports = async function (ctx) {
    ctx.database("store", {
        name: "store",
        pk: "key",
        types: {},
        connect: async function () {
            console.log("Local store connected...");
        },
        modify: async function (model, ctx) {
            model.methods.set("get", async function (payload, ctx) {
                return ctx.lodash.find(ctx.store.get(payload.model), payload.query)
            });

            model.methods.set("getAll", async function (payload, ctx) {
                return ctx.lodash.filter(ctx.store.get(payload.model), payload.query)
            });

            model.methods.set("post", async function (payload, ctx) {
                ctx.store.get(payload.model).push(payload.body)
                return payload.body
            });

            model.methods.set("delete", async function (payload, ctx) {
                ctx.store.set(payload.model,ctx.lodash.filter(ctx.store.get(payload.model), payload.query)) 
            });

            model.methods.set("count", async function (payload, ctx) {
                return ctx.store.get(payload.model).length
            });
        },
        mixin: [],
    })
}