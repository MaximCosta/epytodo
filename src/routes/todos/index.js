const express = require("express");
const { authenticateToken } = require("../../middleware/auth");

function initRoute(app, pool) {
    var todos = express.Router();

    todos.get("", authenticateToken, function (req, res, next) {
        res.send("Hello World! todos");
    });

    todos.get("/:id", authenticateToken, function (req, res, next) {
        res.send("Hello World! todos");
    });

    todos.post("/", authenticateToken, function (req, res, next) {
        res.send("Hello World! todos");
    });

    todos.put("/:id", authenticateToken, function (req, res, next) {
        res.send("Hello World! todos");
    });

    todos.delete("/:id", authenticateToken, function (req, res, next) {
        res.send("Hello World! todos");
    });

    app.use("/todos", todos);

    return todos;
}

module.exports.init = initRoute;
