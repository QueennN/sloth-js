module.exports = async function (payload, ctx) {
   let filters = await ctx.helpers.defaultArrayCalc(payload, "filter");
   if (filters.every((i) => ctx.filters.has(i))) {
    
      for (let i of filters) {  
         let start = Date.now()  
         await ctx.filters.get(i)(payload, ctx);
         ctx.metrics.fookie_lifecycle_function_time.labels("filter",i).observe(Date.now()-start)
      }
   } else {
     payload.response.warnings.push("Missing Filter")
   }
};
