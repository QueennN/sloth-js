module.exports = {
    name: "webhook",
    database:"mongodb",
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        url: {
            required: true,
            type: "string",
            input: "text"
        },
        model: {
            required: true,
            type: "string",
            input: "text"
        },
        method: {
            required: true,
            type: "string",
            input: "text",
        },
        token: {
            type: "string",
            input: "text",
        }
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
        model: {
            role: ["everybody"],
        },
    },
    mixin:[]
};
