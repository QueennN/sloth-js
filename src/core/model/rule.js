module.exports = {
    name: "rule",
    database: "store",
    display: "name",
    schema: {
        name: {
            type:"string",
            required:true,
            unique:true,
        },
        function: {
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
    mixin:[],
};
