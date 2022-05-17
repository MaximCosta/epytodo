module.exports = {
    get_id: "SELECT id FROM user WHERE email = ?",
    view_me: "SELECT * FROM user WHERE id = ?",
    view_todo: "SELECT t.* FROM todo as t, user as u WHERE t.user_id = u.id AND u.id = ?",
    view_one_id: "SELECT * FROM todo WHERE id = ?",
    view_one_email: "SELECT * FROM todo WHERE email = ?",
    update_me: "UPDATE user SET name = ?, firstname = ?, email = ?, password = ? WHERE id = ?",
    delete_me: "DELETE FROM user WHERE id = ?",
}