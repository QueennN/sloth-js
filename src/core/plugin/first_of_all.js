module.exports = async function (ctx) {
   ctx.store.first_of_all = []; //TODO bURADAN has model ve methodu sildim.
   ctx.store.read_write = {
      get: "read",
      getAll: "read",
      post: "write",
      patch: "write",
      getAll: "write",
   };
};
