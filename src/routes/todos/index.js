const express = require("express");
const { authenticateToken } = require("../../middleware/auth");
const { notFoundUser } = require("../../middleware/notFoundUser");
const { getAllTodos, getOneTodo, createTodo, updateTodo, deleteTodo } = require("./todos.query");
const { isId, checkParams } = require("../../utils/validator");

const initRoute = (app) => {
    var todos = express.Router();

    todos.get("", [authenticateToken, notFoundUser], (req, res) => {
        getAllTodos(
            req,
            (todos) => res.status(200).json(todos),
            (code, msg) => res.status(code).json(msg)
        );
    });

    todos.get("/:id", [authenticateToken, notFoundUser], (req, res) => {
        if (!req.params.id || !isId(req.params.id)) return res.status(400).json({ msg: "Bad parameter" });
        getOneTodo(
            req,
            (todo) => res.status(200).json(todo),
            (code, msg) => res.status(code).json(msg)
        );
    });

    todos.post("/", [authenticateToken, notFoundUser], (req, res) => {
        if (!checkParams(req, "post", ["title", "description", "due_time", "user_id", "status"])) return res.status(400).json({ msg: "Bad parameter" });
        let { title, description, due_time, user_id, status } = req.body;
        createTodo(
            req,
            [title, description, due_time, user_id, status],
            (t) => res.status(201).json({ title: t.title, description: t.description, due_time: t.due_time, user_id: t.user_id, status: t.status }),
            (code, msg) => res.status(code).json(msg)
        );
    });

    todos.put("/:id", [authenticateToken, notFoundUser], (req, res) => {
        if (!req.params.id || !isId(req.params.id)) return res.status(400).json({ msg: "Bad parameter" });
        if (!checkParams(req, "put", ["title", "description", "due_time", "user_id", "status"])) return res.status(400).json({ msg: "Bad parameter" });
        let { title, description, due_time, user_id, status } = req.body;
        updateTodo(
            req,
            [title, description, due_time, user_id, status, req.params.id],
            (t) => res.status(200).json({ title: t.title, description: t.description, due_time: t.due_time, user_id: t.user_id, status: t.status }),
            (code, msg) => res.status(code).json(msg)
        );
    });

    todos.delete("/:id", [authenticateToken, notFoundUser], (req, res) => {
        if (!req.params.id || !isId(req.params.id)) return res.status(400).json({ msg: "Bad parameter" });
        deleteTodo(
            req,
            () => res.status(200).json({ msg: `Successfully deleted record number ${req.params.id}` }),
            (code, msg) => res.status(code).json(msg)
        );
    });

    app.use("/todos", todos);

    return todos;
};

module.exports.init = initRoute;
