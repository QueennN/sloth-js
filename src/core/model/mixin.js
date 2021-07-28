module.exports = {
    name: "effect",
    database: "store",
    display: "name",
    schema: {
        name: {
            type:"string",
            required:true,
            unique:true,
        },
        object: {
            type:"object",
            required:true,
        },
    },
    lifecycle: {
        get: {
            role: ["admin"],
        },
        getAll: {
            role: ["admin"],
        },
        patch: {
            role: ["admin"],
        },
        post: {
            role: ["admin"],
            effect: ["sync"],
        },
        delete: {
            role: ["admin"],
            effect: ["sync"],
        },
        model: {
            role: ["everybody"],
        },
    },
};
