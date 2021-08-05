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
        value: {
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
        update: {
            role: ["admin"],
        },
        create: {
            role: ["admin"],
            effect: [],
        },
        delete: {
            role: ["admin"],
            effect: [],
        },
        model: {
            role: ["everybody"],
        },
    },
};
