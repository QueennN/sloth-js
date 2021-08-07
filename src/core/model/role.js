module.exports = {
    name: "role",
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
            role: ["system"],
        },
        getAll: {
            role: ["system"],
        },
        update: {
            role: ["system"],
            effect: [],
        },
        create: {
            role: ["system"],
            effect: [],
        },
        delete: {
            role: ["system"],
            effect: [],
        },
        model: {
            role: ["everybody"],
        },
    },
};
