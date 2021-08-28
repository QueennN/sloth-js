
const Fookie = require("../src/index")
describe("Fookie instance requirements", async function () {
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
    assert.equal(fookie.local.has("model","rule"), true)
    assert.equal(fookie.local.has("model","role"), true)
    assert.equal(fookie.local.has("model","modify"), true)
    assert.equal(fookie.local.has("model","effect"), true)
    assert.equal(fookie.local.has("model","mixin"), true)
    assert.equal(fookie.local.has("model","database"), true)
    assert.equal(fookie.local.has("model","filter"), true)
    assert.equal(fookie.local.has("model","setting"), true)
    assert.equal(fookie.local.has("model","model"), true)

  });

});