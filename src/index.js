const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
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

class Fookie {
   constructor() {
      this.store = {}
      this.lodash = lodash;
      this.axios = axios;
      this.faker = faker;
      this.discord = Discord;
      this.mongoose = mongoose;
      this.sequelize = sequelize;
      this.aws = aws;
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
      this.helpers = {
         rule,
         effect,
         filter,
         preRule,
         modify,
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
   //TODO BU modelde payload üzerinden ayarlama yapmak lazım şuan sanırım get ile almaya calısıyor.
   async run(payload) { // THINK: May be dynamic steps
      let ctx = this;
      for (let b of this.storebefores) {
         await this.store.modify[b](payload, ctx);
      }
      if (await preRule(payload, ctx)) {
         await modify(payload, ctx);
         if (await rule(payload, ctx)) {
            payload.response.data = await this.storemodel.payload.model.methods[payload.method](payload, ctx);
            if (payload.response.status == 200) {
               await filter(payload, ctx);
               effect(payload, ctx);
            }
         } else {
            payload.response.status = 400;
         }

      } else {
         payload.response.status = 400;
      }
      for await (let b of this.store.afters) {
         await this.store.effect[b](payload, ctx);
      }
      return payload.response;
   }

   routine(name, time, func) {
      let routine = setInterval(() => {
         func(this);
      }, time);
      this.routines.set(name, routine);
   }

   async connect(url, config) {
      await mongoose.connect(url, config);
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
      let version = this.package.version
      this.package.version = "test"
      for (let i = 0; i < times; i++) {

         let sample_model = this.lodash.sample(Array.from(this.models).map(i => i[1]))
         let sample_model2 = this.lodash.sample(Array.from(this.models).map(i => i[1]))
         let sample_method = this.lodash.sample(this.lodash.keys(
            this.lodash.sample(Array.from(this.models).map(i => i[1])).lifecycle
         )
         )
         let res = await this.run({
            options: {
               method:sample_model2,
               version:true
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
