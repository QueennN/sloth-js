const Fookie = require("./src");
(async () => {
   const fookie = new Fookie();
   await fookie.connect("mongodb", {
      url: "mongodb://mongo:27017/test",
      options: { server: { auto_reconnect: true }, useNewUrlParser: true, useUnifiedTopology: true }
   });

   await fookie.model({
      name: "testkv",
      database: "store",
      display: "name",
      schema: {
         key: {
            type: "string",
            input: "text",
            require: true
         },
         value: {
            type: "string",
            input: "text",
            require: true
         },
      },
      lifecycle: {
         get: {
            role: ["admin"],
         },
         post: {
            role: ["admin"],
         },
         delete: {
            role: ["admin"],
         },
         info: {
            role: ["everybody"],
         },
      },
   })
   fookie.listen(3000);


   setTimeout(() => {
      fookie.run({
         system:true,
         model:"testkv",
         method:"post":
         body:{
            
         }
      })
   }, 3500);
})();
