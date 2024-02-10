const express = require("express");
const model = require("./model/tasks.js");

const server = express();

server.get("/", (req, res) => {
    res.send('hell world');

    const body = `
    <!doctype html>
    <form method="POST">
        <input id="content" name="content" aria-label="New task" required>
        <button>Add task +</button>
    </form>`;
    res.send(body)
});

server.post("/", express.urlencoded({ extended: false }), (req, res) => {
    const task = {
        content: req.body.content,
        complete: 0,
    };
    model.createTask(task);
    res.redirect("/");
});

module.exports = server;