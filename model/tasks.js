const db = require('../database/db.js');

const insert_task = db.prepare(`
    INSERT INTO tasks (content) 
    VALUES (?)
    RETURNING id, content, created_at
`);

function createTask(content) {
    return insert_task.get(content);
}

module.exports = { createTask };

const result = createTask("Send mum flowers");
console.log(result);