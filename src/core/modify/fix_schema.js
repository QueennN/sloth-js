module.exports = {
   name: "fix_schema",
   function: async function (payload, ctx) {
      let methods = ["create", "get", "getAll", "update", "delete", "count", "test"];
      methods = methods.concat(ctx.lodash.keys(payload.body.lifecycle))
      methods = ctx.lodash.uniq(methods)

      for (let f of ctx.lodash.keys(payload.body.schema)) {
         payload.body.schema[f] = ctx.deepMerge(payload.body.schema[f], {
            write: [],
            read: [],
         });
      }

      for (let method of methods) {
         payload.body.lifecycle[method] = ctx.deepMerge(payload.body.lifecycle[method], {
            modify: [],
            effect: [],
            rule: [],
            preRule: [],
            role: [],
            filter: [],
         });
      }
      payload.body.mixin = ctx.deepMerge(payload.body.mixin, ["default_mixin"]);
   }
}

