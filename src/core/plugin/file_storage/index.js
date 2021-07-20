var multer = require("multer");

module.exports = async function (ctx) {
   var storage = multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, "/uploads");
      },
      filename: function (req, file, cb) {
         cb(null, file.fieldname + "-" + Date.now());
      },
   });

   ctx.upload = multer({ storage: storage });

   ctx.model({
      name: "system_file",
      display: "name",
      schema: {
         name: {
            type: "string",
            required: true,
         },
         mimeType: {
            type: "string",
         },
         path: {
            type: "string",
         },
         byte: {
            type: "number",
         },
      },
      lifecycle: {
         get: {
            rule: ["admin"],
         },
         getAll: {
            rule: ["admin"],
         },
         patch: {
            rule: ["admin"],
            effect: ["form_data"],
         },
         post: {
            rule: ["admin"],
            effect: ["form_data"],
         },
         delete: {
            rule: ["admin"],
            effect: ["form_data"],
         },
         model: {
            rule: ["everybody"],
         },
      },
   });

   ctx.effect("form_data", function (payload, ctx) {
      ctx.upload(payload.req, null, async function (err) {
         console.log(err);
      });
   });
};
