const jwt = require("jsonwebtoken");
const { sha512 } = require("js-sha512");

module.exports = async function (ctx) {
   await ctx.model(require("./model/user"))
   let sys_user = ctx.local.get("model", "user")
   sys_user.methods.set("login", async ({ body, response }, ctx) => {
      let { email, password } = body;
      let res = await ctx.run({
         system: true,
         model: "user",
         method: "get",
         query: {
            email,
            password: sha512(password),
         },
      });
      let user = res.data;
      if (user) {
         const token = jwt.sign(user, ctx.store.get("secret"));
         return token;
      } else {
         response.status = 201;
         response.warnings.push("login not model");
         return false;
      }
   });

   sys_user.methods.set("register", async ({ body, response }, ctx) => {
      let { email, password } = body;
      let res = await ctx.run({
         system: true,
         model: "user",
         method: "create",
         body: {
            email,
            password,
         },
      });

      return res.status == 200;
   });
   ctx.rule("is_last_admin", async function (payload, ctx) {
      let res = await ctx.run({
         system: true,
         method: "count",
         model: "system"
      })

      return res.data != 1
   })

   let res = await ctx.run({
      system: true,
      model: "user",
      method: "count",
   });
   let count = res.data;
   if (count == 0) {
      let user = await ctx.run({
         system: true,
         model: "user",
         method: "create",
         body: {
            email: "system",
            password: "system",
            type: "system",
         },
      });
      await ctx.run({
         system: true,
         model: "system",
         method: "create",
         body: {
            user: user.data._id,
         },
      });
   }
};
