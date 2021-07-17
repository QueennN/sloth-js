module.exports = {
    name: "database",
    database: "store",
    display: "key",
    schema: {
        key: {
            required: true,
            type: "string",
        },
        connect: {
            required: true,
            type: "function",
        },
        modify: {
            required: true,
            type: "function",
        },
        types: {
            required: true,
            type: "object",
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
        },
        delete: {
            role: ["admin"],
        },
        model: {
            role: ["everybody"],
        },
        count: {
            role: ["admin"],
        },
    },
};
