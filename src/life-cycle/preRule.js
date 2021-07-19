module.exports = async function (payload, ctx) {
   for (let rule of ctx.store.get("first_of_all")) {
      let res = await ctx.store.get("rule").get(rule)(payload, ctx);
      if (res ==false) {
         payload.response.warnings.push(`false first of all: ${rule}`);
         return false;
      }
   }
   let preRules = ctx.helpers.defaultArrayCalc(payload, "preRule");
   if (preRules.every((rule) => ctx.store.get("rule").has(rule))) {
      for (let rule of preRules) {
         console.log(rule);
         let res = await ctx.store.get("rule").get(rule)(payload, ctx);
         if (res == false) {
            payload.response.warnings.push(`false preRule: ${rule}`);
            return false;
         }
      }
      return true;
   } else {
      payload.response.warnings.push(`Missing preRule`,store.get("rule"));
      return false     
   }
};
