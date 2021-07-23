const mongoose = require("mongoose")
module.exports = async function (ctx) {
    ctx.database("mongodb", {
        name: "mongodb",
        pk: "_id",
        types: {
            string: ctx.mongoose.Schema.Types.String,
            number: ctx.mongoose.Schema.Types.Number,
            date: ctx.mongoose.Schema.Types.Date,
            buffer: ctx.mongoose.Schema.Types.Buffer,
            boolean: ctx.mongoose.Schema.Types.Boolean,
            object: ctx.mongoose.Schema.Types.Mixed,
            _id: ctx.mongoose.Schema.Types.ObjectId,
            array: ctx.mongoose.Schema.Types.Array
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
                schema[f].type = this.types[model.schema[f].type];
            }

            let Model = mongoose.model(model.name, new mongoose.Schema(schema, { versionKey: false }));


            model.methods.set("get", async function (payload, ctx) {
                let res = await Model.findOne(payload.query, payload.attributes, payload.projection);
                return res;
            });
            model.methods.set("getAll", async function (payload, ctx) {
                let res = await Model.find(payload.query, payload.attributes, payload.projection);
                return res;
            });
            model.methods.set("post", async function (payload, ctx) {
                let res = await Model.create(payload.body);
                return ctx.lodash.pick(res, payload.attributes)
            });
            model.methods.set("delete", async function (payload, ctx) {
                let res = await Model.deleteMany(payload.query);
                return res;
            });
            model.methods.set("patch", async function (payload, ctx) {
                await Model.updateMany(payload.query, payload.body);
                return payload.body
            });

            model.methods.set("count", async function (payload, ctx) {
                let res = await Model.countDocuments(payload.query);
                return res;
            });
        }
    })
}