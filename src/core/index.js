module.exports = async function (ctx) {
   ctx.store = new Map()
   ctx.store.set("secret", "secret");
   ctx.store.set("afters", ["metric", "log"]);
   ctx.store.set("befores", ["metric", "default_payload", "set_user"]);
   //MODELS
   ctx.store.set("model", await ctx.helpers.schemaFixer(require("./model/model.js"))) // FAKE MODEL DECLARETION FOR NO ERROR
   ctx.store.get("model").methods = new Map()
   ctx.store.get("model").methods.set("post", () => { })
   await ctx.model(require("./model/model.js"));


   // MIXIN
   await ctx.mixin("default_mixin", require("./mixin/default_mixin"))
   await ctx.use(require('./database/cassandra'))
   await ctx.use(require('./database/dynomodb'))
   await ctx.use(require('./database/mongodb'))
   await ctx.use(require('./database/postgre'))
   await ctx.use(require('./database/store'))
   await ctx.use(require('./database/nulldb'))
   await ctx.use(require("../helpers/after_before_calculater"));
   await ctx.use(require("./plugin/health_check"));
   await ctx.use(require("../helpers/default_life_cycle_controls"));
   await ctx.use(require("./plugin/first_of_all"));


   await ctx.use(require("./plugin/metric/index"));

   // RULES
   await ctx.rule(require("./rule/has_field"));
   await ctx.rule(require("./rule/check_required"));
   await ctx.rule(require("./rule/only_client"));
   await ctx.rule(require("./rule/has_pwemail"));
   await ctx.rule(require("./rule/check_type"));
   await ctx.rule(require("./rule/check_auth"));
   await ctx.rule(require("./rule/valid_attributes"));
   await ctx.rule(require("./rule/need_target"));
   await ctx.rule(require("./rule/has_model"));
   await ctx.rule(require("./rule/has_method"));
   await ctx.rule(require("./rule/has_body"));
   await ctx.rule(require("./rule/need_method_in_options"));
   await ctx.rule(require("./rule/valid_payload"));
   await ctx.rule(require("./rule/field_control"));
   await ctx.rule(require("./rule/unique"));
   await ctx.rule(require("./rule/has_database"));

   //ROLES
   await ctx.role(require("./role/logged_in"));
   await ctx.role(require("./role/everybody"));
   await ctx.role(require("./role/nobody"));
   await ctx.role(require("./role/admin"));
   await ctx.role(require("./role/system"));

   //EFFECT
   await ctx.effect(require("./effect/sync"));
   await ctx.effect(require("./effect/webhook"));
   await ctx.effect(require("./effect/log"));
   await ctx.effect(require("./effect/metric"));

   //FILTERS
   await ctx.filter(require("./filter/filter"));
   await ctx.filter(require("./filter/simplified"));

   //MODIFIES
   await ctx.modify(require("./modify/password"));
   await ctx.modify(require("./modify/set_default"));
   await ctx.modify(require("./modify/set_target"));
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
   //await ctx.use(require("./defaults/plugin/file_storage")) USE S3 NOT multer xd

   await ctx.use(require("./plugin/user"));
};
