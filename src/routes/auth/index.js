const express = require("express");

function initRoute(app, pool) {
    var auth = express.Router();

    auth.post("/register", function (req, res) {
        this["description"] = "Register a new user";
        res.send("Hello World! auth");
    });

    auth.post("/login", function (req, res) {
        res.send("Hello World! auth");
    });

    app.use("/", auth);

    return auth;
}

module.exports.init = initRoute;
