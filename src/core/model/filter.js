module.exports = {
    name: "filter",
    database: "store",
    display: "name",
    schema: {
        name: {
            type:"string",
            required:true,
            unique:true,
        },
        value: {
            type:"function",
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
            effect: [],
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
