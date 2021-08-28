var assert = require('assert');
const lodash = require("lodash")
const Fookie = require("../src/index")
describe('Fookie Model', async function () {
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
        assert.equal(res.status, 200)
        assert.equal(res.data.name, "model")
    });
});