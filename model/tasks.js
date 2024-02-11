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
    console.log('this is createTask: ', task);
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

const update_content = db.prepare(/*sql*/`
    UPDATE tasks
    SET content = $content
    WHERE id = $id
    RETURNING id, content, created_at, complete
`);

function editTask(task) {
    return update_content.get(task);
}

const update_complete = db.prepare(/*sql*/ `
    UPDATE tasks
    SET complete = NOT complete
    WHERE id = ?
    RETURNING id, content, created_at, complete
`);

function toggleTask(id) {
    return update_complete.get(id);
}

// const result = listTasks();
// console.log(result);

module.exports = { createTask, removeTask, editTask, toggleTask, listTasks };