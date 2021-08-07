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
      update: {
         role: ["system"],
         effect: [],
      },
      create: {
         role: ["system"],
         effect: [],
      },
      delete: {
         role: ["system"],
      },
      model: {
         role: [],
      },
      count: {
         role: ["system"],
      },
   },
};
