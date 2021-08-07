module.exports = {
   name: "database_modify",
   function: async function (payload, ctx) {
      payload.body.methods = new Map();
      await ctx.local.get("database", payload.body.database).modify(payload.body, ctx)

      payload.body.methods.set("test", async function (_payload, _ctx) {
         _payload.method = _payload.options.method + '';
         for (let b of _ctx.store.get("befores")) {
            await _ctx.local.get("modify", b)(_payload, _ctx);
         }
         if (await preRule(_payload, _ctx)) {
            await modify(_payload, _ctx);
            if (await rule(_payload, _ctx)) {
               return true;
            }
         }
         return false;
      });      
   }
}


