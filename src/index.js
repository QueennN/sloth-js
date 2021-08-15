const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const schemaFixer = require("./helpers/schema_fixer.js");
const rule = require("./life-cycle/rule.js");
const effect = require("./life-cycle/effect.js");
const filter = require("./life-cycle/filter.js");
const preRule = require("./life-cycle/preRule.js");
const modify = require("./life-cycle/modify.js");
const prometheus = require("prom-client");
const lodash = require("lodash");
const core = require("./core/index.js");
const mongoose = require("mongoose");
const deepMerge = require("deepmerge");
const axios = require("axios");
const faker = require("faker");
const Discord = require("discord.js");
const sequelize = require("sequelize");
const aws = require("aws-sdk");
const moment = require("moment");
const chalk = require("chalk");
const validator = require("validate.js");
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");
const multer = require("multer");
const CryptoJS = require("crypto-js");
const pckg = require("../package.json");
const redis = require("redis");
const cassandra = require('cassandra-driver');
const uuid = require('uuid');

class Fookie {
   constructor() {
      this.store = new Map()
      this.modelParser = new Map();
      this.lodash = lodash;
      this.axios = axios;
      this.faker = faker;
      this.discord = Discord;
      this.mongoose = mongoose;
      this.sequelize = sequelize;
      this.redis = redis
      this.aws = aws;
      this.cassandra = cassandra
      this.moment = moment;
      this.chalk = chalk;
      this.validator = validator;
      this.cheerio = cheerio;
      this.nodemailer = nodemailer;
      this.multer = multer;
      this.cryptojs = CryptoJS;
      this.prometheus = prometheus
      this.package = pckg;
      this.deepMerge = deepMerge
      this.uuid = uuid
      this.helpers = {
         rule,
         effect,
         filter,
         preRule,
         modify,
         schemaFixer
      };

      this.app = express();
      this.app.use(cors());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use(bodyParser.json());

      this.app.post("/", async (req, res) => {
         let payload = req.body;
         if (payload.user || typeof payload.system == "boolean") return false;
         if (!payload.token && req.headers.token) payload.token = req.headers.token;
         await this.run(payload, this);
         res.status(payload.response.status).json(payload.response.data);
      });
   }

   async mixin(declaration) {
      this.local.set("mixin", declaration)
   }

   async rule(declaration) {
      this.local.set("rule", declaration)
   }

   async role(declaration) {
      this.local.set("role", declaration)
   }

   async filter(declaration) {
      this.local.set("filter", declaration)
   }

   async lifecycle(declaration) {
      this.local.set("lifecycle", declaration)
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
            let res =  await this.local.get("model", payload.model).methods.get(payload.method)(payload, this)
            payload.response.data = this.lodash.cloneDeep(res)
            if (payload.response.status == 200) {
               await filter(payload, this);
               effect(payload, this);
            }
         } else {
            payload.response.status = 400;
         }

      } else {
         payload.response.status = 400;
      }
      for await (let b of this.store.get("afters")) {
         await this.local.get("effect", b).function(payload, this);
      }
      return payload.response;
   }

   routine(name, time, func) {
      let routine = setInterval(() => {
         func(this);
      }, time);
      this.routines.set(name, routine);
   }

   async connect(databaseName, config) {
      let database = this.local.get("database", databaseName)
      await database.connect(config)
   }

   async use(cb) {
      await cb(this);
   }

   async core() { 
      await this.use(core);
   }
   listen(port) {
      this.app.listen(port, () => {
         console.log(`FOOKIE ${port} is listening...`);
      });
   }

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
