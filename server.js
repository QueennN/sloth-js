const Fookie = require("./src");
(async () => {
   const fookie = new Fookie();

   await fookie.listen(2626);
})
();
