module.exports = async function (payload, ctx) {
   return !ctx.lodash.has(payload, "user") && !ctx.lodash.has(payload, "response");
};
