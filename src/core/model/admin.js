module.exports = {
   name: "admin",
   database:"mongodb",
   display: "_id",
   schema: {
      user: {
         relation: "user",
      },
   },
   lifecycle: {
      get: {
         role: ["admin"],
      },
      getAll: {
         role: ["admin"],
      },
      patch: {
         role: ["admin"],
      },
      post: {
         role: ["admin"],
      },
      delete: {
         role: ["admin"],
      },
      model: {
         role: ["everybody"],
      },
   },
};
