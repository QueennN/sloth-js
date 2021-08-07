module.exports = {
   name: "user",
   database: "mongodb",
   display: "email",
   schema: {
      email: {
         onlyClient:true,
         unique: true,
         required: true,
         type: "string",
         input: "text",
      },
      password: {
         onlyClient:true,
         required: true,
         type: "string",
         input: "password",
         read: ["nobody"],
      },
      type: {
         type: "string",
         input: "text",
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
      create: {
         role: ["system"],
         modify: ["password"],
      },
      delete: {
         rule:[],
         role: ["system"],
      },
      model: {
         role: ["everybody"],
      },
      login: {
         preRule: ["has_pwemail"],
      },
      register: {
         preRule: ["has_pwemail"],
      },
   },
};
