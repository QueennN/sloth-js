module.exports = {
   name: "check_type",
   function: async function (payload, ctx) {
      let model = ctx.local.get("model", payload.model)
      let database = ctx.local.get("database", model.database)
      for (let field of ctx.lodash.keys(payload.body)) {
         if (!database.types[model.schema[field].type].controller(payload.body[field])) {
            payload.response.warnings.push(`[Check_Type] Invalid type: ${model.schema[field].type}`);
            payload.response.warnings.push(`[Check_Type] Invalid value: ${payload.body[field]}`);
            return false;
         }
      }
      return true;
   }
}

