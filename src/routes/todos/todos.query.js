module.exports = {
    view_all: "SELECT * FROM todo WHERE user_id = ?",
    view_one: "SELECT * FROM todo WHERE id = ? AND user_id = ?",
    create_one: "INSERT INTO todo SET (title, description, due_time, user_id, status) = (?, ?, ?, ?, ?)",
    update_one: "UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?",
    delete_one: "DELETE FROM todo WHERE id = ?",
};
