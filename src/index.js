
const schemaFixer = require("./helpers/schema_fixer.js");
const rule = require("./life-cycle/rule.js");
const effect = require("./life-cycle/effect.js");
const filter = require("./life-cycle/filter.js");
const preRule = require("./life-cycle/preRule.js");
const modify = require("./life-cycle/modify.js");
const lodash = require("lodash");
const core = require("./core/index.js");
const deepMerge = require("deepmerge");
const axios = require("axios");
const faker = require("faker");
const moment = require("moment");
const validator = require("validate.js");
const CryptoJS = require("crypto-js");
const pckg = require("../package.json");


class Fookie {
   constructor() {
      this.store = new Map()
      this.lodash = lodash;
      this.axios = axios;
      this.faker = faker;
      this.moment = moment;
      this.validator = validator;
      this.cryptojs = CryptoJS;
      this.package = pckg;
      this.deepMerge = deepMerge
      this.helpers = {
         rule,
         effect,
         filter,
         preRule,
         modify,
         schemaFixer
      };
   }

   async mixin(declaration) {
      this.local.set("mixin", declaration)
   }

   async rule(declaration) {
      this.local.set("rule", declaration)
   }

   async setting(declaration) {
      this.local.set("setting", declaration)
   }

   async role(declaration) {
      this.local.set("role", declaration)
   }

   async filter(declaration) {
      this.local.set("filter", declaration)
   }

   async database(declaration) {
      this.local.set("database", declaration)
   }

   async modify(declaration) {
      this.local.set("modify", declaration)
   }

   async model(declaration) {
      let res = await this.run({
         system: true,
         model: "model",
         method: "create",
         body: declaration

      })
      return res.data
   }

   effect(declaration) {
      this.local.set("effect", declaration)
   }

   async run(payload) {
      for (let b of this.store.get("befores")) {
         await this.local.get("modify", b).function(payload, this);
      }
      if (await preRule(payload, this)) {
         await modify(payload, this);
         if (await rule(payload, this)) {
            let res = await this.local.get("model", payload.model).methods.get(payload.method)(payload, this)
            if (payload.method == "create" && payload.model == "setting")
               console.log(payload);
            payload.response.data = res
            if (payload.response.status == true) {
               await filter(payload, this);
               effect(payload, this);
            }
         } else {
            payload.response.status = false;
         }

      } else {
         payload.response.status = false;
      }
      for await (let b of this.store.get("afters")) {
         await this.local.get("effect", b).function(payload, this);
      }
      return lodash.assign({}, payload.response);
   }

   routine(name, time, func) {
      let routine = setInterval(() => {
         func(this);
      }, time);
      this.routines.set(name, routine);
   }

   async use(cb) {
      await cb(this);
   }

   async core() {
      await this.use(core);
   }
   /*
   listen(port) {
      this.app.listen(port, () => {
         console.log(`FOOKIE ${port} is listening...`);
      });
   }*/

   async fuzzer(times) {
      // lodash product kullanabilirsin
      let version = this.package.version
      this.package.version = "test"
      for (let i = 0; i < times; i++) {

         let sample_model = this.lodash.sample(Array.from(this.local).map(i => i[1]))
         let sample_model2 = this.lodash.sample(Array.from(this.local).map(i => i[1]))
         let sample_method = this.lodash.sample(this.lodash.keys(
            this.lodash.sample(Array.from(this.local).map(i => i[1])).lifecycle
         )
         )
         await this.run({
            options: {
               method: sample_model2,
               version: true
            },
            system: true,
            body: {},
            query: {},
            projection: {},
            method: sample_method,
            model: sample_model.name,
         })
      }
      this.package.version = version
   }
}

module.exports = Fookie;
