module.exports = function (ctx) { // kappa xd
    ctx.database({
        name: "nulldb",
        pk: Error(),
        types: {},
        connect: async function () {
            console.log("nullDB connected...");
        },
        modify: async function (model, ctx) {
            model.methods.set("get", async function (payload, ctx) {
                return null
            });

            model.methods.set("getAll", async function (payload, ctx) {
                return []
            });

            model.methods.set("create", async function (payload, ctx) {
                return null
            });

            model.methods.set("delete", async function (payload, ctx) {
                return null
            });

            model.methods.set("count", async function (payload, ctx) {
                return 1
            });
        },
        mixin: [],
    })
}