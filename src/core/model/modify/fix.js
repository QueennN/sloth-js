const deepMerge = require("deepmerge");
const lodash = require('lodash')
module.exports = async function (payload,ctx) {
   let methods = ["post", "get", "getAll", "patch", "delete", "model", "count", "test"];
   methods = methods.concat(lodash.keys(payload.body.lifecycle))
   methods = lodash.uniq(methods)

   for (let f of lodash.keys(payload.body.schema)) {
      payload.body.schema[f] = deepMerge(payload.body.schema[f], {
         write: [],
         read: [],
      });
   }

   for (let method of methods) {
      payload.body.lifecycle[method] = deepMerge(payload.body.lifecycle[method], {
         modify: [],
         effect: [],
         rule: [],
         preRule: [],
         role: [],
         filter: [],
      });
   }
   payload.body.mixin = lodash.uniq(deepMerge(payload.body.mixin, ["default_mixin"])) 
};
