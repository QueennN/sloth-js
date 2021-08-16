module.exports = {
   name: "merge_lifecycle",
   function: async function (payload, ctx) {
      console.log(payload.body.mixin);
   }
}

