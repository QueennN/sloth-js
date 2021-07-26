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
