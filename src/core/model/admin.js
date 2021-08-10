module.exports = {
   name: "system",
   database:"store",
   display: "_id",
   schema: {
      user: {
         relation: "user",
      },
   },
   lifecycle: {
      get: {
         role: ["system"],
      },
      getAll: {
         role: ["system"],
      },
      update: {
         role: ["system"],
      },
      update: {
         role: ["system"],
      },
      delete: {
         role: ["system"],
         rule:["is_last_admin"]
      },
      model: {
         role: ["everybody"],
      },
   },
};
