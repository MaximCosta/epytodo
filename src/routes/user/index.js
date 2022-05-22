const express = require("express");
const { authenticateToken } = require("../../middleware/auth");
const { notFoundUser } = require("../../middleware/notFoundUser");
const { isEmail, isId, checkParams } = require("../../utils/validator");
const { getUserTodo, getUserByIdOrEmail, updateUser, deleteUser } = require("./user.query");

const initRoute = (app) => {
    var user = express.Router();

    user.get("", [authenticateToken, notFoundUser], (req, res) => {
        res.status(200).json({
            id: req.user.id,
            email: req.user.email,
            password: req.user.password,
            created_at: req.user.created_at,
            first_name: req.user.first_name,
            name: req.user.name,
        });
    });

    user.get("/todos", [authenticateToken, notFoundUser], (req, res) => {
        getUserTodo(
            req,
            (todos) => res.status(200).json(todos),
            (code, msg) => res.status(code).json(msg)
        );
    });

    user.get("/:param", [authenticateToken, notFoundUser], (req, res, next) => {
        if (!req.params.param || (!isEmail(req.params.param) && !isId(req.params.param))) return res.status(400).json({ msg: "Bad parameter" });
        getUserByIdOrEmail(
            req,
            (user) => res.status(200).json(user),
            (code, msg) => res.status(code).json(msg)
        );
    });

    user.put("/:id", [authenticateToken, notFoundUser], (req, res, next) => {
        if (!req.params.id || !isId(req.params.id)) return res.status(400).json({ msg: "Bad parameter" });
        if (!checkParams(req, "put", [["email", isEmail], "password", "firstname", "name"])) return res.status(400).json({ msg: "Bad parameter" });
        let { email, password, firstname, name } = req.body;

        updateUser(
            req,
            [email, password, firstname, name, req.params.id],
            (user) => res.status(200).json(user),
            (code, msg) => res.status(code).json(msg)
        );
    });

    user.delete("/:id", [authenticateToken, notFoundUser], (req, res, next) => {
        if (!req.params.id || !isId(req.params.id)) return res.status(400).json({ msg: "Bad parameter" });
        deleteUser(
            req,
            [req.params.id],
            (user) => res.status(200).json(user),
            (code, msg) => res.status(code).json(msg)
        );
    });

    app.use("/user", user);

    return user;
};
module.exports.init = initRoute;
