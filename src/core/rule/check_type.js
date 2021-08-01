var validate = require("validate.js");
//todo lodash
let validators = {
   boolean: "isBoolean",
   string: "isString",
   number: "isNumber",
   object: "isObject",
   array: "isArray"
};
//TODO Burası utanç toblosu 

module.exports = {
   name: "check_type",
   function: async function (payload, ctx) {
      for (let field of ctx.lodash.keys(payload.body)) {
         let isValid = false;
         if (typeof ctx.local.get("model",payload.model).schema[field].relation == "string") {
            isValid = true;
         } else {
            isValid = await validate[validators[ctx.local.get("model",payload.model).schema[field].type]](payload.body[field]);
         }
         if (!isValid) {
            payload.response.warnings.push(
               `[Check_Type] Invalid type: ${ctx.local.get("model",payload.model).schema[field].type}`
            );
            payload.response.warnings.push(`[Check_Type] Invalid value: ${payload.body[field]}`);
            return false;
         }
      }
      return true;
   }
}

