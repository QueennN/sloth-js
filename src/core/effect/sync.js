
const mesh = {
    rule:"rules",
    modify:"modifies",
    effect:"effects",
    role:"roles",
    rule:"rules",
    filter:"filters",
    model:"models",
    mixin:"mixins",
}


module.exports = {
    name: "sync",
    function: async (payload, ctx) => {
        if (payload.method == "delete") {
            ctx[mesh[payload.model]].delete(payload.body.name)
        } else {
            if(mode)
            ctx[mesh[payload.model]].set(payload.body.name, payload.body.function);
        }
    }
}

