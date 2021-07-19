module.exports = {
   name: "user",
   database: "store",
   display: "email",
   schema: {
      email: {
         required: true,
         type: "string",
         input: "email",
      },
      password: {
         input: "password",
         type: "string",
         default: "_id",
      },
      type: {
         description:"this field is situational.",
         input: "text",
         required: true,
         type: "string",
      },
   },
   lifecycle: {
      get: {
         role: ["everybody"],
         rule: ["need_key"],
      },
      post: {
         modify: ["set_methods"],
         role: ["admin"],
         rule: ["need_key"],
      },
      delete: {
         role: ["admin"],
         rule: ["need_key"],
      },
      model: {
         role: ["everybodt"],
         rule: ["need_key"],
      },
      size: {
         role: ["admin"],
         rule: ["need_key"],
      },
   },
};
