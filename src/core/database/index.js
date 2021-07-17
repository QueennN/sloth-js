module.exports = async function (ctx) {
    ctx.database = async function (model) {
        return await ctx.run({
            system: true,
            model: "database",
            method: "set",
            body: model
        })
    }


    const mongooseBodyParser = require("../../helpers/mongooseModelParser")

    module.exports = async function (ctx) {
        ctx.database("mongodb", {
            connect: async function () {
                console.log("connect mongo")
            },
            modify: async function (payload, ctx) {
                payload.body.methods = new Map()

                let MDL = mongooseBodyParser(payload.body)

                payload.body.methods.set("get", async function (_payload, _ctx) {
                    let res = await MDL.findOne(_payload.query, _payload.attributes, _payload.projection);
                    return res;
                });
                payload.body.methods.set("getAll", async function (_payload, _ctx) {
                    let res = await MDL.find(_payload.query, _payload.attributes, _payload.projection);
                    return res;
                });
                payload.body.methods.set("post", async function (_payload, _ctx) {
                    let res = await MDL.create(_payload.body);
                    return res;
                });
                payload.body.methods.set("delete", async function (_payload, _ctx) {
                    let res = await MDL.deleteMany(_payload.query);
                    return res;
                });
                payload.body.methods.set("patch", async function (_payload, _ctx) {
                    return await MDL.updateMany(_payload.query, _payload.body);
                });
                payload.body.methods.set("_payload.body", async function (_payload, _ctx) {
                    return JSON.parse(JSON.stringify(_payload.body))
                });
                payload.body.methods.set("count", async function (_payload, _ctx) {
                    let res = await MDL.countDocuments(_payload.query);
                    return res;
                });
                payload.body.methods.set("test", async function (_payload, _ctx) {
                    _payload.method = _payload.options.method + '';
                    _payload.options.simplified = false
                    for (let b of _ctx.store.get("befores")) {
                        await _ctx.store.get("modify").get(b)(_payload, _ctx);
                    }
                    if (await preRule(_payload, _ctx)) {
                        await modify(_payload, _ctx);
                        if (await rule(_payload, _ctx)) {
                            return true;
                        }
                    }
                    return false;
                });
            }
        })
        
        module.exports = async function (ctx) {
            ctx.database("system", {
                connect: async function () {
                    console.log("dont need")
                },
                modify: async function (payload, ctx) {
                    payload.body.methods = new Map()
                    payload.body.methods.set("get", async function (payload, ctx) {
                        return ctx[payload.model].get(payload.key)
                    });
                    payload.body.methods.set("post", async function (payload, ctx) {
                        ctx[payload.model].set(payload.key, payload.body)
                        return payload.body
                    });
                    payload.body.methods.set("delete", async function (payload, ctx) {
                        ctx[payload.model].delete(payload.key)
                    });
                    payload.body.methods.set("model", async function (payload, ctx) {
                        return JSON.parse(JSON.stringify(model))
                    });
                    payload.body.methods.set("size", async function (payload, ctx) {
                        payload.body.methods.size
                    });
                    payload.body.methods.set("test", async function (payload, ctx) {
                        payload.method = payload.options.method + '';
                        payload.options.simplified = false
                        for (let b of ctx.store.get("befores")) {
                            await ctx.store.get("modify").get(b)(payload, ctx);
                        }
                        if (await preRule(payload, ctx)) {
                            await modify(payload, ctx);
                            if (await rule(payload, ctx)) {
                                return true;
                            }
                        }
                        return false;
                    });

                }
            })
        }
    }
}