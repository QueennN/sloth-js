module.exports = {
    name: "database",
    database: "store",
    display: "name",
    schema: {
        name: {
            type:"string",
            required:true,
            unique:true,
        },
        pk: {
            type:"string",
            required:true,
        },
        types: {
            type:"object",
        },
        connect: {
            type:"function",            
        },
        modify: {
            type:"function",
            required:true,
        },
        disconnect: {
            type:"function",
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
