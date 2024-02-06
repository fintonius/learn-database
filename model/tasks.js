const db = require('../database/db.js');

// the VALUES property(?) takes info from the argument passed to it
// when the createTask() function is called if it's passed an object
// as the argument, ie: createTask({ content: "stuff", complete: 1 })
// the statement will map each key to the corresponding $param in 
// the query
// ...I think...
const insert_task = db.prepare(`
    INSERT INTO tasks (content, complete)
    VALUES ($content, $complete)
    RETURNING id, content, created_at
`);

function createTask(task) {
    return insert_task.get(task);
}

const select_tasks = db.prepare(
    `SELECT 
        id, 
        content, 
        TIME(created_at) AS created_at,
        complete 
    FROM tasks`
);

function listTasks() {
    return select_tasks.all();
}

const delete_task = db.prepare(
    `DELETE FROM tasks WHERE id = ?`
);

function removeTask(id) {
    delete_task.run(id);
}
removeTask(1);
module.exports = { createTask };

const result = listTasks();
console.log(result);