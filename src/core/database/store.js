module.exports = function (ctx) {
    ctx.database({
        name: "store",
        pk: "name",
        types: {
            any: {
                type: null,
                controller: () => true
            },
            id: {
                type: String,
                controller: ctx.lodash.isString
            },
            object: {
                type: Object,
                controller: ctx.lodash.isObject
            },
            string: {
                type: String,
                controller: ctx.lodash.isString
            },
            number: {
                type: Number,
                controller: ctx.lodash.isNumber
            },
            boolean: {
                type: Boolean,
                controller: ctx.lodash.isBoolean
            },
            function: {
                type: Function,
                controller: ctx.lodash.isFunction
            },
            array: {
                type: Array,
                controller: ctx.lodash.isArray
            },
        },
        connect: async function () {
            console.log("Local store connected...");
        },
        modify: async function (model, ctx) {
            model.methods.set("get", async function (_payload, _ctx) {
                return _ctx.lodash.pick(_ctx.lodash.find(_ctx.store.get(_payload.model), _payload.query), _payload.attributes)
            });

            model.methods.set("getAll", async function (_payload, _ctx) {
                return _ctx.lodash.filter(_ctx.store.get(_payload.model), _payload.query).map(i => _ctx.lodash.pick(i, _payload.attributes))
            });

            model.methods.set("create", async function (_payload, _ctx) {
                _payload.body.id = "mdb_" + _ctx.uuid.v4()
                _ctx.store.get(_payload.model).push(_payload.body)
                return _payload.body
            });

            model.methods.set("update", async function (_payload, _ctx) {
                let pool = _ctx.store.get(_payload.model)
                let ids = _ctx.lodash.filter(pool, _payload.query).map(i => i.id)

                for (let item of pool) {
                    for (key in _payload.body) {
                        if (ids.includes(item.id)) {
                            item[key] = _payload.body[key]
                        }
                    }
                }
                _ctx.store.set(_payload.model, pool)
                return true
            });
            model.methods.set("delete", async function (_payload, _ctx) {
                let pool = _ctx.store.get(_payload.model)
                let rejected = _ctx.lodash.reject(pool, _payload.query)
                _ctx.store.set(_payload.model, rejected)
                return true
            });

            model.methods.set("count", async function (_payload, _ctx) {
                let pool = _ctx.store.get(_payload.model)
                let filtered = _ctx.lodash.filter(pool, _payload.query)
                return filtered.length
            });
        },
        mixin: [],
    })
}