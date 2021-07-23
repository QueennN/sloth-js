module.exports = async function(ctx){
    ctx.database("posgtre",{
        name:"postgre",
        types:{},
        pk:"id",
        connect:async function(config){
            console.log("connection");
        },
        modify:async function (payload,model) {
            console.log("hi db");            
        }
    })
}