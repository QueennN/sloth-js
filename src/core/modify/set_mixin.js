module.exports = {
   name: "set_mixin",
   function: async function (payload, ctx) {
      let arr = payload.body.mixin
      for (let i of arr) {
         payload.body = ctx.deepMerge(payload.body, ctx.local.get("mixin", i).object)
      }
   }
}

