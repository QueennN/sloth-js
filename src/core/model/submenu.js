module.exports = {
   name: "submenu",
   database:"mongodb",
   display: "_id",
   schema: {
      model: {
         relation: "model",
      },
      menu: {
         relation: "menu",
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
         role: ["everybody"],
      },
      count: {
         role: ["system"],
      },
   },
};
