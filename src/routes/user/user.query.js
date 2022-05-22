const bcrypt = require("bcrypt");

const queries = {
    get_id: "SELECT `id` FROM `user` WHERE `email` = ?",
    get_user: "SELECT * FROM `user` WHERE `email` = ?",
    get_user_id_email: "SELECT * FROM `user` WHERE `id` = ? OR `email` = ?",
    view_user: "SELECT * FROM `user` WHERE `id` = ?",
    view_todo: "SELECT t.* FROM `todo` as t, `user` as u WHERE t.user_id = u.id AND u.id = ?",
    view_one_id: "SELECT * FROM `todo` WHERE `id` = ?",
    view_one_email: "SELECT * FROM `todo` WHERE `email` = ?",
    insert_user: "INSERT INTO `user` (`email`, `password`, `first_name`, `name`) VALUES (?, ?, ?, ?)",
    update_user: "UPDATE `user` SET `email` = ?, `password` = ?, `first_name` = ?, `name` = ? WHERE `id` = ?",
    delete_user: "DELETE FROM `user` WHERE `id` = ?",
};

const getUser = (req, callback, callErr) => {
    req.db.execute(queries.get_user, [req.email], (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error" });
        if (rows.length == 0) return callErr(404, { msg: "Not found" });
        req.user = rows[0];
        callback();
    });
};

const registerUser = (req, params, callback, callErr) => {
    req.db.execute(queries.insert_user, params, (err, rows, fields) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") return callErr(409, { msg: "Account already exists" });
            return callErr(500, { msg: "Internal server error" });
        }
        callback();
    });
};

const loginUser = (req, params, callback, callErr) => {
    req.db.execute(queries.get_user, [params[0]], (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error" });
        if (rows.length == 0) return callErr(404, { msg: "Not found" });
        if (bcrypt.compareSync(params[1], rows[0].password)) return callback();
        return callErr(401, { msg: "Invalid Credentials" });
    });
};

const getUserTodo = (req, callback, callErr) => {
    req.db.execute(queries.view_todo, [req.user.id], (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error" });
        callback(rows);
    });
};

const getUserByIdOrEmail = (req, callback, callErr) => {
    req.db.execute(queries.get_user_id_email, [req.params.param], (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error" });
        if (rows.length == 0) return callErr(404, { msg: "Not found" });
        callback(rows[0]);
    });
};

const updateUser = (req, params, callback, callErr) => {
    req.db.execute(queries.update_user, params, (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error" });
        getUserByIdOrEmail(req, callback, callErr);
    });
};

const deleteUser = (req, params, callback, callErr) => {
    req.db.execute(queries.delete_user, params, (err, rows, fields) => {
        if (err) return callErr(500, { msg: "Internal server error" });
        callback({ msg: `Successfully deleted record number: ${params[0]}` });
    });
};

module.exports = { getUser, registerUser, loginUser, getUserTodo, getUserByIdOrEmail, updateUser, deleteUser };
