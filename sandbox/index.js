

(async () => {
    const Fookie = require("../src/index");
    const lodash = require("lodash")
    const fookie = new Fookie()
    await fookie.core()

    let res = await fookie.run({
        system: true,
        model: "model",
        method: "getAll",
        attributes: ["database"],
        projection: {
            limit: 1,
            offset: 1,
        }
    })
    console.log(res);
})()