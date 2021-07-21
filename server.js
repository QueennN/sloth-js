const Fookie = require("./src");
(async () => {
   const fookie = new Fookie();
   await fookie.connect("mongodb","mongodb://mongo:27017/test",{ server:{auto_reconnect:true},useNewUrlParser: true, useUnifiedTopology: true });
   fookie.listen(3000);
})();
