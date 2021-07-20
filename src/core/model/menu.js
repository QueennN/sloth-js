module.exports = {
   name: "menu",
   database:"mongodb",
   display: "name",
   schema: {
      name: {
         input: "text",
         required: true,
         type: "string",
      },
      icon: {
         input: "text",
         type: "string",
      },
   },
   lifecycle: {
      get: {
         role: ["everybody"],
      },
      getAll: {
         filter: [],
         role: ["everybody"],
      },
      patch: {
         role: ["admin"],
         effect: [],
      },
      post: {
         role: ["admin"],
         effect: [],
      },
      delete: {
         role: ["admin"],
      },
      model: {
         role: [],
      },
      count: {
         role: ["admin"],
      },
   },
};
