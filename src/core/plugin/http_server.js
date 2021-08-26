
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = async function (ctx) {
    ctx.app = express();
    ctx.app.use(cors());
    ctx.app.use(bodyParser.urlencoded({ extended: true }));
    ctx.app.use(bodyParser.json());
    ctx.app.post("/", async (req, res) => {
        let payload = req.body;
        if (payload.user || typeof payload.system == "boolean") return false;
        if (!payload.token && req.headers.token) payload.token = req.headers.token;
        await ctx.run(payload, ctx);
        res.status(payload.response.status).json(payload.response.data);
    });
}