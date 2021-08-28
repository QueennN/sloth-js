const Fookie = require("../src/index")
describe("Fookie instance requirements", function () {
  it('insrance of fookie have to include store', function () {
    const fookie = new Fookie()
    if (!fookie.store) throw Error("")
  });

  it('insrance of fookie have to include run', function () {
    const fookie = new Fookie()
    if (!fookie.run) throw Error("")
  });

  it('insrance of fookie have to include fuzzer', function () {
    const fookie = new Fookie()
    if (!fookie.fuzzer) throw Error("")
  });

  it('insrance of fookie have to include rule', function () {
    const fookie = new Fookie()
    if (!fookie.rule) throw Error("")
  });
  
  it('insrance of fookie have to include effect', function () {
    const fookie = new Fookie()
    if (!fookie.effect) throw Error("")
  });

  it('insrance of fookie have to include filter', function () {
    const fookie = new Fookie()
    if (!fookie.filter) throw Error("")
  });

  it('insrance of fookie have to include role', function () {
    const fookie = new Fookie()
    if (!fookie.role) throw Error("")
  });

  it('insrance of fookie have to include database', function () {
    const fookie = new Fookie()
    if (!fookie.database) throw Error("")
  });

  it('insrance of fookie have to include use', function () {
    const fookie = new Fookie()
    if (!fookie.use) throw Error("")
  });

  it('insrance of fookie have to include model', function () {
    const fookie = new Fookie()
    if (!fookie.model) throw Error("")
  });

  it('insrance of fookie have to include mixin', function () {
    const fookie = new Fookie()
    if (!fookie.mixin) throw Error("")
  });
});