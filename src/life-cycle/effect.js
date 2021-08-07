module.exports = async function (payload, ctx) {
   let arr = ctx.helpers.defaultArrayCalc(payload, "effect");
   if (arr.every((e) => ctx.local.has("effect",e))) {
      arr.forEach((eff) => {
         ctx.local.get("effect",eff)(payload, ctx);
      });
   } else {
      payload.response.status = 400
      throw Error("Missing Effect");
   }
};
