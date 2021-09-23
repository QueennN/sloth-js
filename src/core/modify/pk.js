module.exports = {
    name: "pk",
    function: async function (payload, ctx) {
        // BOdydeki pk durak mı düşün? todo
        let model = ctx.local.get("model", payload.model)
        let database = ctx.local.get("database", model.database)

        if (ctx.lodash.has(payload.body, "pk")) {
            payload.body = ctx.lodash.assign(payload.body, { [database.pk]: payload.body.pk })
            payload.body = ctx.lodash.omit(payload.body, ["pk"])
        }

        if (ctx.lodash.has(payload.query, "pk")) {
            payload.query = ctx.lodash.assign(payload.query, { [database.pk]: payload.query.pk })
            payload.query = ctx.lodash.omit(payload.query, ["pk"])
        }
    }
}

