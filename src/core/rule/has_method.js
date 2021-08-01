module.exports = {
   name: "has_method",
   function: async function (payload, ctx) {
      if (payload.hasOwnProperty("method") && typeof payload.method == "string") {
         let model = ctx.local.get("model",payload.model);
         if (model.methods.has(payload.method)) {
            return true;
         } else {
            payload.response.warnings.push("Has method err");
            return false;
         }
      } else {
         payload.response.warnings.push("method is not string");
         return false;
      }
   }
}

