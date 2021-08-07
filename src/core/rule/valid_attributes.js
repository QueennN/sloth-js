module.exports = {
    name: "valid_attributes",
    function: async function (payload, ctx) {
        if (payload.attributes && ctx.lodash.isArray(payload.attributes)) {
            let model = ctx.local.get("model", payload.model)
            return payload.attributes.every(k => ctx.lodash.keys(model.schema).includes(k))
        } else {
            return true
        }
    }
}
