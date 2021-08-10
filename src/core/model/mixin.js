module.exports = {
    name: "mixin",
    database: "store",
    display: "name",
    schema: {
        name: {
            type: "string",
            required: true,
            unique: true,
        },
        value: {
            type: "object",
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
