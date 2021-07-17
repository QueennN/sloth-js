module.exports = async function (ctx) {
    let funcs = ["modify", "effect", "filter", "rule", "role","mixin"]
    for (let f of funcs) {
        ctx.store.set(f,new Map())
        ctx[f] = async function (name,func) {                    
            ctx.store.get(f).set(name,func)
        }   
    }
}