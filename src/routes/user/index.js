const express = require("express");
const { authenticateToken } = require("../../middleware/auth");

function initRoute(app, pool) {
    var user = express.Router();

    user.get("", authenticateToken, function (req, res) {
        res.send("Hello World! user");
    });

    user.get("/todos", authenticateToken, function (req, res) {
        res.send("Hello World! user");
    });

    user.get("/:id", authenticateToken, function (req, res, next) {
        let id = req.params.id;
        if (!/^\d+$/.test(id)) next();
    });
    user.get("/:email", authenticateToken, function (req, res, next) {
        let email = req.params.email;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) res.status(400).json({ msg: "Bad parameter" });
    });

    app.use("/user", user);

    return user;
}
module.exports.init = initRoute;
