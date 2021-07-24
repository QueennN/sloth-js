module.exports = async function (payload, ctx) {
   // gerçekten model ve method kontrolünden nefret ediyorum.düzelt buaryı
   if (!(await ctx.rules.get("has_model")(payload, ctx))) return false
   if (!(await ctx.rules.get("has_method")(payload, ctx))) return false

   let rules = ctx.helpers.defaultArrayCalc(payload, "preRule");
   if (rules.every((rule) => ctx.rules.has(rule))) {
      for (let rule of rules) {
         let start = Date.now()
         let res = await ctx.rules.get(rule)(payload, ctx);
         ctx.metrics.fookie_lifecycle_function_time.labels("filter", rule).observe(Date.now() - start)
         if (res == false) {
            payload.response.warnings.push(`false preRule: ${rule}`);
            return false;
         }
      }
      return true;
   } else {
      payload.response.warnings.push(`Missing preRule`, rules);
      return false
   }
};
