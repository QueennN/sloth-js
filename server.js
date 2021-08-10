const Fookie = require("./src");
(async () => {
   const fookie = new Fookie();
   await fookie.core()
   await fookie.model({
      name:"test",
      display:"name",
      database:"store",
      schema:{
         name:{
            type:"string",
            input:"text",
            required:true,
         }
      },
      lifecycle: {
         get: {
            role: ["everybody"],

         },
         getAll: {
         },
         update: {
            role: ["system"],
         },
         create: {
            role: ["system"],
         },
         delete: {
            role: ["system"],
         },
         count: {
            role: ["system"],
         },
      },
      methods: {},
      mixin: ["default_mixin"],
   })
   await fookie.listen(2626);
})
   ();
