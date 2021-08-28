var assert = require('assert');
const lodash = require("lodash")
const Fookie = require("../src/index")
describe('Lifecycle functions',async function () {
    it('Lifecycle models', async function () {
        assert.equal(fookie.local.has("model","rule"), true)
        assert.equal(fookie.local.has("model","role"), true)
        assert.equal(fookie.local.has("model","modify"), true)
        assert.equal(fookie.local.has("model","effect"), true)
        assert.equal(fookie.local.has("model","mixin"), true)
        assert.equal(fookie.local.has("model","database"), true)
        assert.equal(fookie.local.has("model","filter"), true)
    });
});