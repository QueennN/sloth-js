module.exports = async function (payload, ctx) {
   let rules = await ctx.helpers.defaultArrayCalc(payload, "rule");
   if (rules.every((i) => ctx.store.get("rule").has(i))) {
      for (let i of store.rule) {
         let res = await ctx.store.get("rule").get(i)(payload, ctx);
         if (res == false) {
            payload.response.warnings.push(`false rule: ${i}`);
            return false;
         }
      }
      return true;
   } else {
      payload.response.warnings.push("invalid rule", store.rule);
   }
};
