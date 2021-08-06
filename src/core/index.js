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
   ctx.store.set("afters", ["metric", "log"]);
   ctx.store.set("befores", ["default_payload", "metric"]); // TODO set user
   ctx.use(require("../helpers/local.js"))
   ctx.use(require("../helpers/after_before_calculater"));
   ctx.use(require("./plugin/health_check"));
   ctx.use(require("../helpers/default_life_cycle_controls"));
   ctx.use(require("./plugin/metric/index"));

   // RULES
   ctx.rule(require("./rule/has_field"));
   ctx.rule(require("./rule/check_required"));
   ctx.rule(require("./rule/only_client"));
   ctx.rule(require("./rule/has_pwemail"));
   ctx.rule(require("./rule/check_type"));
   ctx.rule(require("./rule/check_auth"));
   ctx.rule(require("./rule/valid_attributes"));
   ctx.rule(require("./rule/has_model"));
   ctx.rule(require("./rule/has_method"));
   ctx.rule(require("./rule/has_body"));
   ctx.rule(require("./rule/need_method_in_options"));
   ctx.rule(require("./rule/valid_payload"));
   ctx.rule(require("./rule/field_control"));
   ctx.rule(require("./rule/unique"));
   ctx.rule(require("./rule/has_database"));

   //ROLES
   ctx.role(require("./role/logged_in"));
   ctx.role(require("./role/everybody"));
   ctx.role(require("./role/nobody"));
   ctx.role(require("./role/admin"));
   ctx.role(require("./role/system"));

   //EFFECT
   ctx.effect(require("./effect/webhook"));
   ctx.effect(require("./effect/log"));
   ctx.effect(require("./effect/metric"));

   //FILTERS
   ctx.filter(require("./filter/filter"));
   ctx.filter(require("./filter/simplified"));

   //MODIFIES
   ctx.modify(require("./modify/password"));
   ctx.modify(require("./modify/set_default"));
   ctx.modify(require("./modify/set_user"));
   ctx.modify(require("./modify/default_payload"));
   ctx.modify(require("./modify/increase"));
   ctx.modify(require("./modify/attributes"));
   ctx.modify(require("./modify/version"));
   ctx.modify(require("./modify/metric"));
   ctx.modify(require("./modify/pk"));
   ctx.modify(require("./modify/set_mixin"));
   ctx.modify(require("./modify/database_modify"));
   ctx.modify(require("./modify/fix_schema"));

   // MIXIN
   ctx.mixin(require("./mixin/default_mixin"))

   //DATABASES
   ctx.use(require('./database/store'))
   ctx.use(require('./database/cassandra'))
   ctx.use(require('./database/dynomodb'))
   ctx.use(require('./database/mongodb'))
   ctx.use(require('./database/postgre'))
   ctx.use(require('./database/nulldb'))

   //-----TRICKY SET
   const model = require("./model/model.js")
   model.methods = new Map()
   model.methods.set("update", () => { throw Error("CORE ERRORED") })
   model.methods.set("count", () => { throw Error("CORE ERRORED") })
   ctx.local.set("model", ctx.helpers.schemaFixer(ctx.lodash.cloneDeep(model)));
   await ctx.run({
      system: true,
      model: "model",
      method: "update",
      body: model
   })
   //-----TRICKY SET

   //MODEL
   await ctx.model(require("./model/menu.js"));
   await ctx.model(require("./model/submenu.js"));
   await ctx.model(require("./model/admin.js"));
   await ctx.model(require("./model/webhook.js"));
   await ctx.model(require('./model/role'))
   await ctx.model(require('./model/rule'))
   await ctx.model(require('./model/modify'))
   await ctx.model(require('./model/effect'))
   await ctx.model(require('./model/filter'))

   // PLUGINS
   //ctx.use(require("./defaults/plugin/file_storage")) USE S3 NOT multer xd
   //ctx.use(require("./plugin/user"));
};
