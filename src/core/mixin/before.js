module.exports = {
    name: "before",
    object: {
        get: {
            modify: [],
            rule: [],
            preRule: ["has_model", "has_method", "valid_attributes"],
            filter: [],
            effect: [],
        },
        getAll: {
            modify: [],
            rule: [],
            preRule: ["has_model", "has_method", "valid_attributes"],
            filter: [],
            effect: [],
        },
        create: {
            modify: ["set_default", "increase"],
            rule: ["check_required", "has_field", "check_type", "field_control", "unique"],
            preRule: ["has_model", "has_method", "only_client", "has_body"],
            filter: [],
            effect: [],

        },
        update: {
            preRule: ["has_model", "has_method", "has_body"],
            modify: [],
            rule: ["has_field", "check_type", "check_required", "field_control"], //TODO UNIQUE
            filter: [],
            effect: [],

        },
        delete: {
            modify: [],
            rule: [],
            preRule: ["has_model", "has_method"],
            filter: [],
            effect: [],

        },
        count: {
            modify: [],
            rule: [],
            preRule: ["has_model", "has_method"],
            filter: [],
            effect: [],

        },
        test: {
            modify: [],
            rule: ["has_field"],
            preRule: ["has_model", "has_method", "need_method_in_options"],
            filter: [],
            effect: [],

        },
    }
}
