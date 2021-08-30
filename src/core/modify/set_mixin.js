module.exports = {
   name: "set_mixin",
   function: async function (payload, ctx) {
      payload.body = ctx.deepMerge({ lifecycle: ctx.local.get("mixin", "before").object }, payload.body)
      payload.body.mixin.push("default_mixin")
      console.log(payload.body.mixin);
      for (let i of payload.body.mixin) {
         payload.body = ctx.deepMerge(payload.body, ctx.local.get("mixin", i).object)
      }
      payload.body = ctx.deepMerge(payload.body, { lifecycle: ctx.local.get("mixin", "after").object })
   }
}

