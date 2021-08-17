module.exports = {
   name: "menu",
   database:"store",
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
   mixin:[]
};
