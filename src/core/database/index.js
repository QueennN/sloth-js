module.exports = async function (ctx) {
    ctx.database = async function (model) {
        return await ctx.run({
            system: true,
            model: "database",
            method: "post",
            body: model,
        })
    }


    const mongooseBodyParser = require("../../helpers/mongooseModelParser")

    module.exports = async function (ctx) {
        ctx.database("mongodb", {
            connect: async function () {
                console.log("connect mongo")
            },
            modify: async function (payload, ctx) {
                payload.body.methods = {}

                let MDL = mongooseBodyParser(payload.body)

                ctx.store.model[payload.body.name].methods.get, async function (_payload, _ctx) {
                    let res = await MDL.findOne(_payload.query, _payload.attributes, _payload.projection);
                    return res;
                };
                ctx.store.model[payload.body.name].methods.getAll = async function (_payload, _ctx) {
                    let res = await MDL.find(_payload.query, _payload.attributes, _payload.projection);
                    return res;
                }
                ctx.store.model[payload.body.name].methods.post = async function (_payload, _ctx) {
                    let res = await MDL.create(_payload.body);
                    return res;
                }
                ctx.store.model[payload.body.name].methods.delete = async function (_payload, _ctx) {
                    let res = await MDL.deleteMany(_payload.query);
                    return res;
                }
                ctx.store.model[payload.body.name].methods.patch = async function (_payload, _ctx) {
                    return await MDL.updateMany(_payload.query, _payload.body);
                }
                ctx.store.model[payload.body.name].methods._payload.body = async function (_payload, _ctx) {
                    return JSON.parse(JSON.stringify(_payload.body))
                }
                ctx.store.model[payload.body.name].methods.count = async function (_payload, _ctx) {
                    let res = await MDL.countDocuments(_payload.query);
                    return res;
                }
                ctx.store.model[payload.body.name].methods.test = async function (_payload, _ctx) {
                    _payload.method = _payload.options.method + '';
                    _payload.options.simplified = false
                    for (let b of _ctx.store.befores) {
                        await _ctx.store.modify[b](_payload, _ctx);
                    }
                    if (await preRule(_payload, _ctx)) {
                        await modify(_payload, _ctx);
                        if (await rule(_payload, _ctx)) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        })

        module.exports = async function (ctx) {
            ctx.database("store", {
                connect: async function () {
                    console.log("dont need")
                },
                modify: async function (payload, ctx) {
                    console.log(1);
                    console.log(ctx.store.model[payload.body.name].methods);
                    ctx.store.model[payload.body.name].methods.get = async function (_payload, _ctx) {
                        return ctx.store[_payload.model]._payload.key
                    }
                    ctx.store.model[payload.body.name].methods.post = async function (_payload, ctx) {
                        ctx.store[_payload.model].set(_payload.key, _payload.body)
                        return _payload.body
                    }
                    ctx.store.model[payload.body.name].methods.delete = async function (_payload, ctx) {
                        ctx.store[_payload.model].delete(_payload.key)
                    }
                    ctx.store.model[payload.body.name].methods.model = async function (_payload, ctx) {
                        return JSON.parse(JSON.stringify(payload.body))
                    }
                    ctx.store.model[payload.body.name].methods.size = async function (_payload, ctx) {
                        _payload.body.methods.size
                    }
                    ctx.store.model[payload.body.name].methods.test = async function (_payload, ctx) {
                        _payload.method = _payload.options.method + '';
                        _payload.options.simplified = false
                        for (let b of ctx.store.befores) {
                            await ctx.store.modify[b](_payload, ctx);
                        }
                        if (await preRule(_payload, ctx)) {
                            await modify(_payload, ctx);
                            if (await rule(_payload, ctx)) {
                                return true;
                            }
                        }
                        return false;
                    }

                }
            })
        }
    }
}