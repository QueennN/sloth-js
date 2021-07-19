module.exports = {
   name: "model",
   database:"store",
   display: "name",
   schema: {
      name: {
         input: "text",
         required: true,
         type: "string",
      },
      display: {
         input: "text",
         type: "string",
         default: "_id",
      },
      database: {
         input: "text",
         required: true,
         type: "string",
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
   },
   lifecycle: {
      get: {
         role: ["admin"],
         rule:["need_key"],
      },
      post: {
         modify:["set_methods","fix","set_mixins"],
         role: ["admin"],
      },
      delete: {
         role: ["admin"],
         rule:["need_key"],
      },
      model: {
         role: ["everybody"],
         rule:[],
      },
      size: {
         role: ["admin"],
         rule:[],
      },
   },
};
