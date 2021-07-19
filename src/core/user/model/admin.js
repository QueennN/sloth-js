module.exports = {
    name: "admin",
    database:"store",
    display: "name",
    schema: {
       user: {
          relative:"user",
          required: true,
       },
    },
    lifecycle: {
       get: {
          role: ["everybody"],
          rule:["need_key"],
       },
       post: {
          modify:["set_methods"],
          role: ["admin"],
          rule:["need_key"],
       },
       delete: {
          role: ["admin"],
          rule:["need_key"],
       },
       model: {
          role: ["everybodt"],
          rule:["need_key"],
       },
       size: {
          role: ["admin"],
          rule:["need_key"],
       },
    },
 };
 