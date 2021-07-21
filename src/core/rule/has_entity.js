module.exports = async function (payload, ctx) {
   let model = ctx.models.get(payload.model);
    let keys = ctx.lodash.keys(model.schema);
   for (let key of keys) {
      if (model.schema[key].relation) {
         let res = await tx.run({
            system:true,
            model: model.schema[key].relation,
            query:{
               _id:payload.body[key]
            },
            key:payload.body[key]
         })
         if(res === false) return false 
      }
   }
   return true
};
