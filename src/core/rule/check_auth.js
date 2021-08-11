module.exports = {
   name: "check_auth",
   function: async function (payload, ctx) {
      let roles = ["system"].concat(ctx.helpers.defaultArrayCalc(payload, "role"))

      if (roles.length == 0) return true;

      if (roles.every((e) => ctx.local.has("role", e))) {
         for (let role of roles) {
            let res = await ctx.local.get("role", role).function(payload, ctx);
            let modifies = [];
            if (!res) {
               payload.response.warnings.push(`You are not: ${role}`);
               try {
                  modifies = ctx.local.get("model", payload.model).lifecycle[payload.method].reject[role];
               } catch (error) { }
               if (modifies.length == 0) return false;
               else {
                  payload.response.warnings.push(`Rejected Role found. Payload manupilated.: ${role}`);
               }
               await Promise.all(modifies.map((m) => ctx.local.get("modify", m)(payload, ctx)));
            }

            
         }
         return true;
      } else {
         throw Error("Missing role");
      }
   }
}

