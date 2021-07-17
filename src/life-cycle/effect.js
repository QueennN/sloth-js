module.exports = async function (payload, ctx) {
   let arr = ctx.helpers.defaultArrayCalc(payload, "effect");
   if (arr.every((e) => ctx.store.get("effect").has(e))) {
      arr.forEach((eff) => {
         ctx.store.get("effect").get(eff)(payload, ctx);
      });
   } else {
      throw Error("Missing Effect");
   }
};
