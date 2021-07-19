module.exports = async function (ctx) {
   //EFFECT
   ctx.effect("sync", require("./effect/sync"));
   ctx.effect("webhook", require("./effect/webhook"));
   ctx.effect("log", require("./effect/log"));
   ctx.effect("metric", require("./effect/metric"));

   //FILTERS
   ctx.filter("filter", require("./filter/filter"));
   ctx.filter("simplified", require("./filter/simplified"));

   
   //MODIFIES
   ctx.modify("password", require("./modify/password"));
   ctx.modify("set_default", require("./modify/set_default"));
   ctx.modify("set_target", require("./modify/set_target"));
   ctx.modify("set_user", require("./modify/set_user"));
   ctx.modify("default_payload", require("./modify/default_payload"));
   ctx.modify("increase", require("./modify/increase"));
   ctx.modify("attributes", require("./modify/attributes"));
   ctx.modify("version", require("./modify/version"));
   ctx.modify("metric", require("./modify/metric"));

   // DATABASES
   // mongoose
   await ctx.use(require("./method/mongoose/index"));

   // PLUGINS
   //await ctx.use(require("./defaults/plugin/file_storage"))
   await ctx.use(require("./plugin/metric/index"));
   await ctx.use(require("./plugin/system_user"));
}


