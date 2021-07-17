module.exports = async function(ctx){
    ctx.store.set("secret", "secret");
    ctx.store.set("afters", []);
    ctx.store.set("befores", []);
 
    // IMPORTANT PLUGINS
    await ctx.use(require("../helpers/after_before_calculater"));
    await ctx.use(require("./plugin/health_check"));
    await ctx.use(require("./plugin/first_of_all"));
    await ctx.use(require("../helpers/default_life_cycle_controls"));

    // LIFECYCLE
    await ctx.modify("fix",require("./modify/fix.js"))
    await ctx.modify("set_methods",require("./modify/set_methods.js"))
    await ctx.modify("set_mixins",require("./modify/set_mixins.js"))
    
    await ctx.rule("has_fields", require("./rule/has_fields"));
    await ctx.rule("check_required", require("./rule/check_required"));
    await ctx.rule("only_client", require("./rule/only_client"));
    await ctx.rule("has_model", require("./rule/has_model"));
    await ctx.rule("has_method", require("./rule/has_method"));
    await ctx.rule("unique", require("./rule/unique"));
    await ctx.rule("check_type", require("./rule/check_type"));
    await ctx.rule("has_body", require("./rule/has_body"));
    await ctx.rule("field_control", require("./rule/field_control"));
    await ctx.rule("need_method_in_options", require("./rule/need_method_in_options"));
   ctx.mixin("default_mixin", require("./new_core/model/mixin/default_mixin"))
   ctx.rule("valid_payload", require("./rule/valid_payload"));
   ctx.rule("valid_attributes", require("./rule/valid_attributes")); 
   ctx.effect("sync", require("./effect/sync"));
   ctx.effect("webhook", require("./new_core/model/effect/webhook"));
   ctx.effect("log", require("./effect/log"));
   ctx.effect("metric", require("./effect/metric"));
   ctx.filter("filter", require("./filter/filter"));
   ctx.filter("simplified", require("./new_core/model/filter/simplified"));
   ctx.modify("password", require("./user/modify/password"));
   ctx.modify("set_default", require("./modify/set_default"));
   ctx.modify("set_user", require("./new_core/user/modify/set_user"));
   ctx.modify("default_payload", require("./modify/default_payload"));
   ctx.modify("increase", require("./modify/increase"));
   ctx.modify("attributes", require("./new_core/model/effect/attributes"));
   ctx.modify("version", require("./new_core/model/modify/version"));
   ctx.modify("metric", require("./modify/metric"));


   // PLUGINS
   //await ctx.use(require("./defaults/plugin/file_storage"))
   await ctx.use(require("./plugin/metric/index"));


    // Plugins
    await ctx.use(require("./database/index")) 
    await ctx.use(require("./model/index"))
    await ctx.use(require("./functions/index"))


    await ctx.use(require("./user/index"))

}