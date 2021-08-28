var assert = require('assert');
const Fookie = require("../src/index")



describe('#crud', async function () {

  var fookie;

  fookie = new Fookie()
  await fookie.core()

  let example_model = {
    name: "test_model",
    database: "store",
    display: "_id",
    schema: {
      user: {
        relation: "user",
      },
    },
    lifecycle: {
      get: {},
      getAll: {},
      update: {},
      update: {},
      delete: {},
      model: {},
    },
    mixin: [],

  }


  let res = await fookie.run({
    system: true,
    model: "model",
    method: "create",
    body: example_model
  })
  assert.equal(res.data.name, "test_model")
  assert.equal(res.status, 200)

   res = await fookie.run({
    system: true,
    model: "model",
    method: "create",
    body: example_model
  })
  res = await fookie.run({
    system: true,
    model: "model",
    method: "update",
    query: {
      name: "test_model"
    },
    body: {
      name: "test_model2"
    }
  })

  assert.equal(res.data.name, "test_model2")
  assert.equal(res.status, 200)

});