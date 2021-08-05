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
         role: ["admin"],
      },
      getAll: {
         role: ["admin"],
      },
      update: {
         role: ["admin"],
      },
      create: {
         role: ["admin"],
         modify: ["password"],
      },
      delete: {
         rule:[],
         role: ["admin"],
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
