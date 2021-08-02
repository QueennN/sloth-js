module.exports = {
   name: "system",
   function: async function (payload, ctx) {         
      if(ctx.lodash.has(payload, 'system')){
         if(typeof payload.system == "boolean") return payload.system
         else if(typeof payload.system == "string") return ctx.store.get("system_token") === payload.system
         else return false 
      }else{
         return false
      }
   }
}
