module.exports = async function (ctx) {
    let funcs = ["modify", "effect", "filter", "rule", "role", "mixin"]
    for (let f of funcs) {
        ctx.store[f] = {}
        ctx[f] = async function (name, func) {
            ctx.store[f][name] = func
        }
    }
}