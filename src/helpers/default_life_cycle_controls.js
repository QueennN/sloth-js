module.exports = async function (ctx) {
   ctx.store.set("default_life_cycle_controls", {
      get: {
         modify: {
            before: [],
            after: ["attributes", "pk"],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method", "valid_attributes"],
            after: ["valid_payload"],
         },
         filter: {
            before: [],
            after: ["simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      getAll: {
         modify: {
            before: [],
            after: ["attributes", "pk"],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method", "valid_attributes"],
            after: ["valid_payload"],
         },
         filter: {
            before: [],
            after: ["simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      create: {
         modify: {
            before: ["set_default", "increase"],
            after: ["attributes", "version", "pk"],
         },
         rule: {
            before: ["check_required", "has_field", "check_type", "field_control", "unique"],
            after: ["check_auth","has_entity"],
         },
         preRule: {
            before: ["has_model", "has_method", "only_client", "has_body"],
            after: ["valid_payload"],
         },
         filter: {
            before: [],
            after: ["simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      update: {
         preRule: {
            before: ["has_model", "has_method", "has_body"],
            after: ["valid_payload", "need_target"],
         },
         modify: {
            before: [],
            after: ["attributes", "pk"],
         },
         rule: {
            before: ["has_field", "check_type", "check_required", "field_control"], //TODO UNIQUE
            after: ["check_auth","has_entity"],
         },
         filter: {
            before: [],
            after: ["simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      delete: {
         modify: {
            before: [],
            after: ["pk"],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method"],
            after: ["valid_payload"],
         },
         filter: {
            before: [],
            after: [],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      count: {
         modify: {
            before: [],
            after: ["pk"],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method"],
            after: ["valid_payload"],
         },
         filter: {
            before: [],
            after: [],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      test: {
         modify: {
            before: [],
            after: [],
         },
         rule: {
            before: ["has_field"],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method", "need_method_in_options"],
            after: ["valid_payload"],
         },
         filter: {
            before: [],
            after: [],
         },
         effect: {
            before: [],
            after: [],
         },
      },
   });
};
