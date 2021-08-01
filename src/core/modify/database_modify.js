module.exports = {
   name: "database_modify",
   function:async function (payload, ctx) {
      console.log(1);
      payload.body.methods = new Map();
      ctx.local.get("database",payload.body.database).modify(payload.body, ctx)
   
      payload.body.methods.set("model", async function (_payload, _ctx) {
         return JSON.parse(JSON.stringify(_payload.body))
      });
   
      payload.body.methods.set("test", async function (_payload, _ctx) {
         _payload.method = _payload.options.method + '';
         for (let b of _ctx.store.get("befores")) {
            await _ctx.run({ system: true, model: "modify", method: "get", query: { name: b } })(_payload, _ctx);
         }
         if (await preRule(_payload, _ctx)) {
            await modify(_payload, _ctx);
            if (await rule(_payload, _ctx)) {
               return true;
            }
         }
         return false;
      });
      ctx.local.set("model",payload.body) //THINK tricky yöntem fakat bilmiyorum dogrumu ??? >£#$>#£$ª¶£#
   }
}


