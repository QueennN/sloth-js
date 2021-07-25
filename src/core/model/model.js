module.exports = {
   name: "model",
   database:"store",
   display: "name",
   schema: {
      name: {
         unique: true,
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
      methods:{
         input:"json",
         type:"object",
         write:["nobody"]
      },
      mixin:{
         input: "json",
         type: "array",
      },
      version:{
         type:"string"
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
         modify:["set_mixin","fix_schema","database_modify"],
         role: ["admin"],
         effect: ["sync"],
      },
      post: {
         modify:["set_mixin","fix_schema","database_modify"],
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
   methods:{},
   mixin:["default_mixin"],
   version:"core"
};
