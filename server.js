const Fookie = require("./src");
(async () => {
   const fookie = new Fookie();

   await fookie.connect("mongodb", {
      url: "mongodb://127.0.0.1:27017/test",
      options: { useNewUrlParser: true, useUnifiedTopology: true }
   });

   await fookie.listen(2626);
})
();
