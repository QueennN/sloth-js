module.exports = {
   name: "model",
   database:"mongodb",
   display: "name",
   schema: {
      name: {
         input: "text",
         required: true,
         type: "string",
      },
      database: {
         input: "text",
         required: true,
         type: "string",
      },
      display: {
         input: "text",
         required: true,
         type: "string",
         default: "_id",
      },
      schema: {
         input: "json",
         required: true,
         type: "object",
      },
      lifecycle: {
         input: "json",
         required: true,
         type: "object",
      },
      mixin:{
         input: "json",
         type: "array",
      }
   },
   lifecycle: {
      get: {
         role: ["everybody"],
      },
      getAll: {
         role: ["everybody"],
      },
      patch: {
         role: ["admin"],
         effect: ["sync"],
      },
      post: {
         role: ["admin"],
         effect: ["sync"],
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
   mixin:[]
};
