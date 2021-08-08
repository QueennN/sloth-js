module.exports = async function (payload, ctx) {
   let filters = await ctx.helpers.defaultArrayCalc(payload, "filter");
   if (filters.every((i) => ctx.local.has("filter",i))) {
    
      for (let i of filters) {  
         let start = Date.now()  
         await ctx.local.get("filter",i).function(payload, ctx);
         ctx.metrics.fookie_lifecycle_function_time.labels("filter",i).observe(Date.now()-start)
      }
   } else {
      payload.response.status = 400
      payload.response.warnings.push(`Missing filter: `+ ctx.lodash.remove(filters, r => ctx.local.has("filter",r)));
   }
};
