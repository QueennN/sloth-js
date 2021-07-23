module.exports = async function(ctx){
    ctx.database("store",{
        name:"store",
        pk:"key",
        types:{},
        connect:async function(){
            console.log("Local store connected...");
        },
        modify:async function (model, ctx) { 
            ctx.store.set(model.name,new Map())

            model.methods.set("get", async function (payload, ctx) {
                return ctx.store.get(payload.model).get(payload.query.key) || {}
            });

            model.methods.set("post", async function (payload, ctx) {
                ctx.store.get(payload.model).set(payload.body.key,payload.body)
                return payload.body
            });

            model.methods.set("delete", async function (payload, ctx) {
                ctx.store.get(payload.model).delete(payload.query.key)
                return true
            });
            
            model.methods.set("count", async function (payload, ctx) {
                return ctx.store.get(payload.model).size
            });        
        },
        mixin:[],
    })
}