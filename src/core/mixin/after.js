module.exports = {
    name: "after",
    object: {
        get: {
            modify: ["attributes", "pk"],
            rule: ["check_auth"],
            preRule: ["valid_payload"],
            filter: ["simplified"],
            effect: [],
        },
        getAll: {
            modify: ["attributes", "pk"],
            rule: ["check_auth"],
            preRule: ["has_model", "has_method", "valid_attributes"],
            filter: ["simplified"],
            effect: [],
        },
        create: {
            modify: ["attributes", "version", "pk"],
            rule: ["check_auth", "has_entity"],
            preRule: ["valid_payload"],
            filter: ["simplified"],
            effect: [],
        },
        update: {
            preRule: ["valid_payload", "need_target"],
            modify: ["attributes", "pk"],
            rule: ["check_auth", "has_entity"],
            filter: ["simplified"],
            effect: [],

        },
        delete: {
            modify: ["pk"],
            rule: ["check_auth"],
            preRule: ["valid_payload"],
            filter: [],
            effect: [],
        },
        count: {
            modify: ["pk"],
            rule: ["check_auth"],
            preRule: ["valid_payload"],
            filter: [],
            effect: [],
        },
        test: {
            modify: [],
            rule: ["check_auth"],
            preRule: ["valid_payload"],
            filter: [],
            effect: [],
        },
    }
}
