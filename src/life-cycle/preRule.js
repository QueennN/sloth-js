module.exports = async function (payload, ctx) {
   for (let rule of ctx.store.get("first_of_all")) {
      let res = await ctx.rules.get(rule)(payload, ctx);
      if (res ==false) {
         payload.response.warnings.push(`false first of all: ${rule}`);
         return false;
      }
   }

   let rules = ctx.helpers.defaultArrayCalc(payload, "preRule");
   if (rules.every((rule) => ctx.rules.has(rule))) {      
      for (let rule of rules) {
         let start = Date.now()         
         let res = await ctx.rules.get(rule)(payload, ctx);
         ctx.metrics.fookie_lifecycle_function_time.labels("filter",rule).observe(Date.now()-start)
         if (res == false) {
            payload.response.warnings.push(`false preRule: ${rule}`);
            return false;
         }
      }
      return true;
   } else {
      payload.response.warnings.push(`Missing preRule`,rules);
      return false     
   }
};
