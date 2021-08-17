module.exports = function (ctx) {
   ctx.helpers.defaultArrayCalc = function (payload, mapName) {
      if (ctx.local.get("model", payload.model).lifecycle[payload.method]) {
        
         return ctx.local.get("model", payload.model).lifecycle[payload.method][mapName]; 
   
      }
      console.log(payload.model);   
      return []
   };
};
