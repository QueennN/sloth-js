module.exports = {
    name: "setting",
    database: "store",
    display: "name",
    schema: {
        name: {
            type: "string",
            required: true,
            unique: true,
        },
        value: {
            type: "any",
            required: true,
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
    mixin:[],
};
