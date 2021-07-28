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
      this.models = new Map();
      this.rules = new Map();
      this.roles = new Map();
      this.effects = new Map();
      this.routines = new Map();
      this.filters = new Map();
      this.databases = new Map();
      this.modifies = new Map();
      this.mixins = new Map();
      this.store = new Map();
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
         if (payload.user || payload.system) return false;
         if (!payload.token && req.headers.token) payload.token = req.headers.token;
         await this.run(payload, this);
         res.status(payload.response.status).json(payload.response.data);
      });

      this.use(core);
   }

   async mixin(declaration) {
      await this.run({
         system: true,
         model: "mixin",
         method: "post",
         body: declaration
      })
   }

   async rule(declaration) {
      await this.run({
         system: true,
         model: "rule",
         method: "post",
         body: declaration
      })
   }

   async role(declaration) {
      await this.run({
         system: true,
         model: "role",
         method: "post",
         body: declaration
      })
   }

   async filter(declaration) {
      await this.run({
         system: true,
         model: "filter",
         method: "post",
         body: declaration
      })
   }

   async atabase(declaration) {
      await this.run({
         system: true,
         model: "database",
         method: "post",
         body: declaration
      })
   }

   async modify(declaration) {
      await this.run({
         system: true,
         model: "modify",
         method: "post",
         body: declaration
      })
   }

   async model(declaration) {
      await this.run({
         system: true,
         model: "model",
         method: "post",
         body: declaration
      })
   }

   async effect(declaration) {
      await this.run({
         system: true,
         model: "effect",
         method: "post",
         body: declaration
      })
   }

   async run(payload) {

      for (let b of this.store.get("befores")) {
         console.log(b);
         await this.modifies.get(b)(payload, this);
      }
      if (await preRule(payload, this)) {
         await modify(payload, this);
         if (await rule(payload, this)) {
            payload.response.data = await this.models.get(payload.model).methods.get(payload.method)(payload, this);
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
         await this.effects.get(b)(payload, this);
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
      await this.run({
         system: true,
         model: "database",
         model: "get",
         query: {
            name: databaseName
         }
      }).connect(config)
   }

   async use(cb) {
      await cb(this);
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

         let sample_model = this.lodash.sample(Array.from(this.models).map(i => i[1]))
         let sample_model2 = this.lodash.sample(Array.from(this.models).map(i => i[1]))
         let sample_method = this.lodash.sample(this.lodash.keys(
            this.lodash.sample(Array.from(this.models).map(i => i[1])).lifecycle
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
