module.exports = async function (ctx) {
   ctx.store.set("system_token", process.env.SYSTEM_TOKEN || "admin")
   ctx.store.set("model", [])
   ctx.store.set("mixin", [])
   ctx.store.set("database", [])
   ctx.store.set("rule", [])
   ctx.store.set("role", [])
   ctx.store.set("effect", [])
   ctx.store.set("modify", [])
   ctx.store.set("filter", [])
   ctx.store.set("secret", "secret");
   ctx.store.set("afters", ["log", "metric"]);
   ctx.store.set("befores", ["default_payload", "metric"]); // TODO set user
   await ctx.use(require("../helpers/local.js"))
   await ctx.use(require("../helpers/after_before_calculater"));
   await ctx.use(require("./plugin/health_check"));
   await ctx.use(require("./plugin/metric/index"));

   // RULES
   await ctx.rule(require("./rule/has_field"));
   await ctx.rule(require("./rule/check_required"));
   await ctx.rule(require("./rule/only_client"));
   await ctx.rule(require("./rule/has_pwemail"));
   await ctx.rule(require("./rule/check_type"));
   await ctx.rule(require("./rule/check_auth"));
   await ctx.rule(require("./rule/valid_attributes"));
   await ctx.rule(require("./rule/has_model"));
   await ctx.rule(require("./rule/has_method"));
   await ctx.rule(require("./rule/has_body"));
   await ctx.rule(require("./rule/need_method_in_options"));
   await ctx.rule(require("./rule/valid_payload"));
   await ctx.rule(require("./rule/field_control"));
   await ctx.rule(require("./rule/unique"));
   await ctx.rule(require("./rule/has_database"));
   await ctx.rule(require("./rule/need_target"));
   await ctx.rule(require("./rule/has_entity"));

   //ROLES
   await ctx.role(require("./role/logged_in"));
   await ctx.role(require("./role/everybody"));
   await ctx.role(require("./role/nobody"));
   await ctx.role(require("./role/admin"));
   await ctx.role(require("./role/system"));

   //EFFECT
   await ctx.effect(require("./effect/webhook"));
   await ctx.effect(require("./effect/log"));
   await ctx.effect(require("./effect/metric"));

   //FILTERS
   await ctx.filter(require("./filter/filter"));
   await ctx.filter(require("./filter/simplified"));



   //MODIFIES
   await ctx.modify(require("./modify/merge_lifecycle"));
   await ctx.modify(require("./modify/password"));
   await ctx.modify(require("./modify/set_default"));
   await ctx.modify(require("./modify/set_user"));
   await ctx.modify(require("./modify/default_payload"));
   await ctx.modify(require("./modify/increase"));
   await ctx.modify(require("./modify/attributes"));
   await ctx.modify(require("./modify/version"));
   await ctx.modify(require("./modify/metric"));
   await ctx.modify(require("./modify/pk"));
   await ctx.modify(require("./modify/set_mixin"));
   await ctx.modify(require("./modify/database_modify"));
   await ctx.modify(require("./modify/fix_schema"));

   // MIXIN
   await ctx.mixin(require("./mixin/default_mixin"))
   await ctx.mixin(require("./mixin/after"))
   await ctx.mixin(require("./mixin/before"))

   //DATABASES
   await ctx.use(require('./database/store'))
   await ctx.use(require('./database/cassandra'))
   await ctx.use(require('./database/dynomodb'))
   await ctx.use(require('./database/mongodb'))
   await ctx.use(require('./database/postgre'))
   await ctx.use(require('./database/nulldb'))

   //-----TRICKY SET
   const model = require("./model/model.js")
   model.methods = new Map()
   model.methods.set("update", async function (_payload, _ctx) { _ctx.local.set("model", _payload.body) })
   model.methods.set("create", async function (_payload, _ctx) { _ctx.local.set("model", _payload.body) })
   model.methods.set("count", async function (_payload, _ctx) { return 0 })
   ctx.local.set("model", ctx.helpers.schemaFixer(ctx.lodash.cloneDeep(model)));
   model.name = "model2"
   await ctx.run({
      system: true,
      model: "model",
      method: "create",
      body: model
   })
   let mdl = ctx.local.get("model", "model2")
   mdl.name = "model"
   ctx.local.set("model", mdl)
   ctx.local.delete("model", "model2")
   //-----TRICKY SET

   //MODEL
   await ctx.model(require("./model/menu.js"));
   await ctx.model(require("./model/submenu.js"));
   await ctx.model(require("./model/admin.js"));
   await ctx.model(require("./model/webhook.js"));
   await ctx.model(require('./model/role.js'))
   await ctx.model(require('./model/rule.js'))
   await ctx.model(require('./model/modify.js'))
   await ctx.model(require('./model/effect.js'))
   await ctx.model(require('./model/filter.js'))
   await ctx.model(require('./model/setting.js'))
   await ctx.model(require('./model/lifecycle.js'))





   // PLUGINS
   //ctx.use(require("./defaults/plugin/file_storage")) USE S3 NOT multer xd
   //ctx.use(require("./plugin/user"));
};
