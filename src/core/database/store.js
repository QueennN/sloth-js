module.exports = async function(ctx){
    ctx.database("store",{
        name:"store",
        types:{},
        connect:async function(){
            console.log("connection");
        },
        modify:async function (payload,model) {
            console.log("hi db");            
        }
    })
}