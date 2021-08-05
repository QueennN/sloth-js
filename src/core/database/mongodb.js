module.exports = function (ctx) {
    ctx.database({
        name: "mongodb",
        pk: "_id",
        types: {
            any: {
                type: ctx.mongoose.Schema.Types.Mixed,
                controller: () => true
            },
            _id: {
                type: ctx.mongoose.Schema.Types.ObjectId,
                controller: ctx.lodash.isString
            },
            object: {
                type: ctx.mongoose.Schema.Types.Mixed,
                controller: ctx.lodash.isObject
            },
            string: {
                type: ctx.mongoose.Schema.Types.String,
                controller: ctx.lodash.isString
            },
            number: {
                type: ctx.mongoose.Schema.Types.Number,
                controller: ctx.lodash.isNumber
            },
            boolean: {
                type: ctx.mongoose.Schema.Types.Boolean,
                controller: ctx.lodash.isBoolean
            },
            array: {
                type: ctx.mongoose.Schema.Types.Array,
                controller: ctx.lodash.isArray
            },
        },
        connect: async function (config) {
            await ctx.mongoose.connect(config.url, config.options);
        },
        modify: async function (model, ctx) {
            let schema = {};
            for (let f in model.schema) {
                schema[f] = {};
                if (typeof model.schema[f].relation == "string") {
                    model.schema[f].type = "_id";
                }
                if (!ctx.lodash.keys(this.types).includes(model.schema[f].type)) {
                    throw Error(`Invalid Type: ${model.schema[f].type} Model: ${model.name}`);
                }
                schema[f].type = this.types[model.schema[f].type].type;
            }
            let Model = ctx.mongoose.model(model.name, new ctx.mongoose.Schema(schema, { versionKey: false }));

            model.methods.set("get", async function (payload, ctx) {
                let res = await Model.findOne(payload.query, payload.attributes, payload.projection).lean();
                return res;
            });
            model.methods.set("getAll", async function (payload, ctx) {
                let res = await Model.find(payload.query, payload.attributes, payload.projection).lean();
                return res;
            });
            model.methods.set("create", async function (payload, ctx) {
                let res = await Model.create(payload.body);
                return ctx.lodash.pick(res, payload.attributes)
            });
            model.methods.set("delete", async function (payload, ctx) {
                let res = await Model.deleteMany(payload.query);
                return res;
            });
            model.methods.set("update", async function (payload, ctx) {
                return await Model.updateMany(payload.query, payload.body);
            });

            model.methods.set("count", async function (payload, ctx) {
                let res = await Model.countDocuments(payload.query);
                return res;
            });
        }
    })
}