module.exports = {
    name: "lifecycle",
    database: "store",
    display: "name",
    schema: {
        name: {
            type:"string",
            required:true,
            unique:true,
        },
        object: {
            type:"function",
            required:true,
        },
    },
    lifecycle: {
        get: {
            role: ["system"],
        },
        getAll: {
            role: ["system"],
        },
        update: {
            role: ["system"],
        },
        create: {
            role: ["system"],
        },
        delete: {
            role: ["system"],
        },
    },
    mixin:[]
};
