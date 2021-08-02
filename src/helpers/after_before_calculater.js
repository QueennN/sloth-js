module.exports = function (ctx) {
   ctx.helpers.defaultArrayCalc = function (payload, mapName) {
      let a1 = [];
      let a2 = [];
      let a3 = [];
      //TODO FIRST OF ALL KALINCA BURASI PATLIYOR
      if (ctx.lodash.has(ctx.store.get("default_life_cycle_controls")[payload.method], mapName)) {
         a1 = ctx.store.get("default_life_cycle_controls")[payload.method][mapName].before;
         a3 = ctx.store.get("default_life_cycle_controls")[payload.method][mapName].after;
      }

      if (ctx.local.get("model", payload.model).lifecycle[payload.method]) {
         a2 = ctx.local.get("model", payload.model).lifecycle[payload.method][mapName];
      }

      return [...a1, ...a2, ...a3];

   };
};
