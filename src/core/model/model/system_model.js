module.exports = {
   name: "model",
   database:"system",
   display: "name",
   schema: {
      name: {
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
};
