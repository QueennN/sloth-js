module.exports = async function (ctx) {
   ctx.store.set("first_of_all", []);
   ctx.store.set("read_write", {
      get:"read",
      getAll:"read",
      post:"write",
      patch:"write",
   });
};
