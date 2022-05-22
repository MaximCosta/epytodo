const queries = {
    view_all: "SELECT * FROM todo WHERE user_id = ?",
    view_one: "SELECT * FROM todo WHERE id = ? AND user_id = ?",
    create_one: "INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)",
    update_one: "UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?",
    delete_one: "DELETE FROM todo WHERE id = ?",
};

const getAllTodos = (req, callback, callErr) => {
    req.db.execute(queries.view_all, [req.user.id], (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error" });
        callback(rows);
    });
};

const getOneTodo = (req, callback, callErr) => {
    req.db.execute(queries.view_one, [req.params.id, req.user.id], (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error" });
        if (rows.length == 0) return callErr(404, { msg: "Not found" });
        callback(rows[0]);
    });
};

const createTodo = (req, params, callback, callErr) => {
    req.db.execute(queries.create_one, params, (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error", err });
        req.params.id = rows.insertId;
        getOneTodo(req, callback, callErr);
    });
};

const updateTodo = (req, params, callback, callErr) => {
    req.db.execute(queries.update_one, params, (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error" });
        getOneTodo(req, callback, callErr);
    });
}

const deleteTodo = (req, callback, callErr) => {
    req.db.execute(queries.delete_one, [req.params.id], (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error" });
        callback();
    });
}

module.exports = { getAllTodos, getOneTodo, createTodo, updateTodo, deleteTodo };
