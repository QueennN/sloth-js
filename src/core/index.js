module.exports = async function (ctx) {
    ctx.store.secret = "secret"
    ctx.store.afters = ["log", "metric"]
    ctx.store.befores = ["default_payload"]

    // IMPORTANT PLUGINS
    await ctx.use(require("../helpers/after_before_calculater"));
    await ctx.use(require("./plugin/health_check"));
    await ctx.use(require("./plugin/first_of_all"));
    await ctx.use(require("../helpers/default_life_cycle_controls"));

    //CORE
    await ctx.use(require("./plugin/metric/index"));
    await ctx.use(require("./database/index"))
    await ctx.use(require("./model/index"))
    await ctx.use(require("./functions/index"))
    await ctx.use(require("./user/index"))
    // LIFECYCLE
    await ctx.modify("fix", require("./model/modify/fix.js"))
    await ctx.modify("set_methods", require("./model/modify/set_methods.js"))
    await ctx.modify("set_mixins", require("./model/modify/set_mixins.js"))
    await ctx.rule("has_fields", require("./model/rule/has_fields"));
    await ctx.rule("check_required", require("./model/rule/check_required"));
    await ctx.rule("only_client", require("./model/rule/only_client"));
    await ctx.rule("has_model", require("./model/rule/has_model"));
    await ctx.rule("has_method", require("./model/rule/has_method"));
    await ctx.rule("unique", require("./model/rule/unique"));
    await ctx.rule("check_type", require("./model/rule/check_type"));
    await ctx.rule("has_body", require("./model/rule/has_body"));
    await ctx.rule("field_control", require("./model/rule/field_control"));
    await ctx.rule("need_method_in_options", require("./model/rule/need_method_in_options"));
    await ctx.mixin("default_mixin", require("./model/mixin/default_mixin"))
    await ctx.rule("valid_payload", require("./model/rule/valid_payload"));
    await ctx.rule("valid_attributes", require("./model/rule/valid_attributes"));
    await ctx.effect("sync", require("./model/effect/sync"));
    await ctx.effect("webhook", require("./model/effect/webhook"));
    await ctx.effect("log", require("./model/effect/log"));
    await ctx.effect("metric", require("./model/effect/metric"));
    await ctx.filter("filter", require("./model/filter/filter"));
    await ctx.filter("simplified", require("./model/filter/simplified"));
    await ctx.modify("password", require("./user/modify/password"));
    await ctx.modify("set_default", require("./model/modify/set_default"));
    await ctx.modify("set_user", require("./user/modify/set_user"));
    await ctx.modify("default_payload", require("./model/modify/default_payload"));
    await ctx.modify("increase", require("./model/modify/increase"));
    await ctx.modify("attributes", require("./model/modify/attributes"));
    await ctx.modify("version", require("./model/modify/version"));
    await ctx.modify("metric", require("./model/modify/metric"));

    await ctx.rule("check_auth", require("./user/rule/check_auth"));
    await ctx.rule("has_pwemail", require("./user/rule/has_pwemail"));

    await ctx.role("loggedin", require("./user/role/loggedin"));
    await ctx.role("everybody", require("./user/role/everybody"));
    await ctx.role("nobody", require("./user/role/nobody"));
    await ctx.role("system_admin", require("./user/role/system_admin"));
    await ctx.role("system", require("./user/role/system"));

    await ctx.model(require("./model/model/model.js"))
    await ctx.model(require("./database/model/database"))
    await ctx.model(require("./user/model/user.js"))
    await ctx.model(require("./user/model/admin.js"))

}