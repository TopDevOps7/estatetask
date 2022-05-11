module.exports = app => {
    var router = require("express").Router();
    const tasks = require("../controllers/task.controller.js");
    // Create a new Tutorial
    router.post("/add", tasks.add);
    router.post("/list", tasks.getList);
    router.post("/delete", tasks.delete);
    router.post("/update", tasks.update);
    app.use('/api/task', router);
};