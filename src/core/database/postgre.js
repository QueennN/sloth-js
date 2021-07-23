module.exports = async function(ctx){
    ctx.database("posgtre",{
        name:"postgre",
        types:{},
        pk:"id",
        connect:async function(config){
            const sequelize = new ctx.sequelize(config.url,{
                define: {
                  freezeTableName: true
                }
              })
            await sequelize.authenticate();
        },
        modify:async function (payload,model) {
            console.log("hi db");            
        }
    })
}