const assert = require('assert');
const Fookie = require("../src/index");

const lodash = require("lodash")
describe('FOOKIE JS ', async function () {
  const fookie = new Fookie()
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

  it('insrance of fookie have to include [run,fuzzer,rule,effect,filter,role,database,use,model,mixin]', async function () {
    if (!fookie.store) throw Error("")
    if (!fookie.run) throw Error("")
    if (!fookie.fuzzer) throw Error("")
    if (!fookie.rule) throw Error("")
    if (!fookie.effect) throw Error("")
    if (!fookie.filter) throw Error("")
    if (!fookie.role) throw Error("")
    if (!fookie.database) throw Error("")
    if (!fookie.use) throw Error("")
    if (!fookie.model) throw Error("")
    if (!fookie.mixin) throw Error("")
    if (!fookie.setting) throw Error("")
  });

  it('Instance needs this models', async function () {
    assert.equal(fookie.local.has("model", "rule"), true)
    assert.equal(fookie.local.has("model", "role"), true)
    assert.equal(fookie.local.has("model", "modify"), true)
    assert.equal(fookie.local.has("model", "effect"), true)
    assert.equal(fookie.local.has("model", "mixin"), true)
    assert.equal(fookie.local.has("model", "database"), true)
    assert.equal(fookie.local.has("model", "filter"), true)
    assert.equal(fookie.local.has("model", "setting"), true)
    assert.equal(fookie.local.has("model", "model"), true)
  });


  it('Model required and crud operations', async function () {
    let res = await fookie.run({
      system: true,
      model: "model",
      method: "get",
      query: {
        name: "model"
      }
    })
    assert.equal(lodash(res.data.methods.has("create")), true)
    assert.equal(lodash(res.data.methods.has("get")), true)
    assert.equal(lodash(res.data.methods.has("getAll")), true)
    assert.equal(lodash(res.data.methods.has("count")), true)
    assert.equal(lodash(res.data.methods.has("test")), true)
    assert.equal(lodash(res.data.methods.has("update")), true)
    assert.equal(lodash(res.data.methods.has("delete")), true)
    assert.equal(res.status, true)
    assert.equal(res.data.name, "model")
  });



  it('Create return type must be object', async function () {
    let res = await fookie.run({
      system: true,
      model: "modify",
      method: "create",
      body: {
        name: "createreturn",
        function: function () { }
      }
    })
    assert.equal(typeof res.data, "object")
  });


  it('Get return type must be object', async function () {
    let res = await fookie.run({
      system: true,
      model: "model",
      method: "get",
      query: {
        name: "model"
      }
    })
    assert.equal(res.status, true)
    assert.equal(typeof res.data, "object")
  });


  it('getAll return type must be array', async function () {
    let res = await fookie.run({
      system: true,
      model: "model",
      method: "getAll",
    })
    assert.equal(res.status, true)
    assert.equal(lodash.isArray(res.data), true)
  });






  it('Create model', async function () {
    let res = await fookie.run({
      system: true,
      model: "setting",
      method: "create",
      body: {
        name: "Create model",
        value: "yow yow"
      }
    })
    assert.equal(res.status, true)
  });





  it('Create and update model', async function () {
    let res = await fookie.run({
      system: true,
      model: "model",
      method: "create",
      body: example_model
    })
    assert.equal(res.data.name, "test_model")
    assert.equal(res.status, true)
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
    assert.equal(res.status, true)
  });




  it('Lifecycle models', async function () {
    assert.equal(fookie.local.has("model", "rule"), true)
    assert.equal(fookie.local.has("model", "role"), true)
    assert.equal(fookie.local.has("model", "modify"), true)
    assert.equal(fookie.local.has("model", "effect"), true)
    assert.equal(fookie.local.has("model", "mixin"), true)
    assert.equal(fookie.local.has("model", "database"), true)
    assert.equal(fookie.local.has("model", "filter"), true)
  });
});