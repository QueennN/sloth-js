module.exports = {
   name: "check_auth",
   function: async function (payload, ctx) {

      let model = ctx.local.get("model", payload.model)
      let roles = [].concat(ctx.helpers.defaultArrayCalc(payload, "role"))

      /*
         Model schemasındaki field'lardaki 
         write veya read rollerini lifecycle 
         rolleri ile birlştirir.
      */
      let decide = "read"
      if (payload.method == "create" || payload.method == "update") {
         decide = "write"
      }
      let keys = ctx.lodash.keys(model.schema)
      let filtered_schema = ctx.lodash.pick(model.schema, keys)
      let defaults = ctx.lodash(filtered_schema)
         .mapValues(o => o[decide])
         .pickBy(v => !ctx.lodash.isUndefined(v))
         .values()
         .flatten()
         .value()
      roles = roles.concat(defaults)
      roles = ctx.lodash.uniq(roles)

      if (roles.length == 0) return true;
      if (roles.every((e) => ctx.local.has("role", e))) {
         for (let role of roles) {
            let modifies = [];
            if (!await ctx.local.get("role", role).function(payload, ctx)) {
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

