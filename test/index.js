const Fookie = require("../src");
(async () => {
   const fookie = new Fookie();
   await fookie.connect("mongodb://localhost/fookie");
   fookie.listen(3000);
})();
