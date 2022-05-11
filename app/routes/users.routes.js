module.exports = app => {
    var router = require("express").Router();
    const users = require("../controllers/user.controller.js");
    // Create a new Tutorial
    router.post("/signin", users.signin);
    router.post("/signup", users.signup);
  
    app.use('/api/users', router);
};