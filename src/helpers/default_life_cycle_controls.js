module.exports = async function (ctx) {
   ctx.store.set("default_life_cycle_controls", {
      get: {
         modify: {
            before: [],
            after: ["attributes","pk"],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method","valid_attributes"],
            after: [],
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
            after: ["attributes","pk"],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method","valid_attributes"],
            after: [],
         },
         filter: {
            before: [],
            after: [ "simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      post: {
         modify: {
            before: ["set_default", "increase"],
            after: ["attributes","version","pk"],
         },
         rule: {
            before: [ "check_required","has_field", "check_type" ,"field_control", "unique"],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method", "only_client", "has_body"],
            after: [],
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
      patch: {
         modify: {
            before: ["set_target"],
            after: ["attributes","pk"],
         },
         rule: {
            before: ["need_target", "has_field", "check_type", "check_required", "field_control", "unique"],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method", "has_body"],
            after: [],
         },
         filter: {
            before: [],
            after: [ "simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      delete: {
         modify: {
            before: ["set_target"],
            after: ["pk"],
         },
         rule: {
            before: ["need_target"],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method"],
            after: [],
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
            after: [],
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
      model: {
         modify: {
            before: [],
            after: ["attributes"],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method"],
            after: [],
         },
         filter: {
            before: [],
            after: ["filter"],
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
            before: ["has_fields",],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method", "need_method_in_options"],
            after: [],
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
