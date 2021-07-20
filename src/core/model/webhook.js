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
        },
        delete: {
            role: ["admin"],
        },
        model: {
            role: ["everybody"],
        },
    },
};
