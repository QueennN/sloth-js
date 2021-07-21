module.exports = async (payload, ctx) => {
    ctx.model(payload.body)
};
