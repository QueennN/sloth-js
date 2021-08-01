module.exports = {
   name: "has_model",
   function: async function (payload, ctx) {
      if (payload.hasOwnProperty("model") && typeof payload.model == "string") {
         if (ctx.local.has("model",payload.model)) {
            return true;
         } else {
            payload.response.warnings.push("Missing model: " + payload.model);
            return false;
         }
      } else {
         payload.response.warnings.push("Need model");
         return false;
      }
   }
}

