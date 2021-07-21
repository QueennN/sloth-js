module.exports = async function(ctx){
    ctx.database("store",{
        name:"store",
        types:{},
        connect:async function(){
            console.log("Local store connected...");
        },
        modify:async function (model, ctx) { 
            ctx.store.set(model.name,new Map())

            model.methods.set("get", async function (payload, ctx) {
                return ctx.store.get(payload.model).get(payload.key) || {}
            });
            model.methods.set("getAll", async function (payload, ctx) {
                return ctx.store.get(payload.model).values()
            });
            model.methods.set("post", async function (payload, ctx) {
                ctx.store.get(payload.model).set(payload.key,payload.body)
                return payload.body
            });
            model.methods.set("delete", async function (payload, ctx) {
                ctx.store.get(payload.model).delete(payload.key)
                return true
            });
            model.methods.set("patch", async function (payload, ctx) {
                ctx.store.get(payload.model).set(payload.key,payload.body)
                return payload.body
            });

            model.methods.set("count", async function (payload, ctx) {
                return ctx.store.get(payload.model).size
            });        
        }
    })
}