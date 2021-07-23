module.exports = async (payload, ctx) => {
    if(payload.method =="delete"){
        ctx.models.delete(payload.body.name)
    }else{
        ctx.model(payload.body)
    }
};
