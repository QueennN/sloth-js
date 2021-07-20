module.exports = async function(ctx){
    ctx.database("cassandra",{
        name:"cassandra",
        types:{},
        connect:async function(){
            console.log("connection");
        },
        modify:async function (payload,model) {
            console.log("hi db");            
        }
    })
}