const express = require("express");
const server = express();
const PORT = 8081;

let todoList = ["Complete Node Byte", "Play Cricket"];

server.get("/todos", (req, res) => {
  res.send(todoList);
});

server.post("/todos", (req, res) => {
  let newTodo = req.body?.name;
  if (!newTodo) {
    return res.status(400).json({ error: "Please provide a 'name' field" });
  }
  todoList.push(newTodo);
  res.status(201).json({ message: "New todo item is added" });
});

server.delete("/todos", (req, res) => {
  let deleteTodo = req.body.name;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i] == deleteTodo) {
      todoList.splice(i, 1);
      res.status(204).send();
    }
  }
});

server.all("/todos", (req, res) => {
  res.status(501).json({ error: "Method not allowed" });
});

server.use((req, res) => {
  res.status(404).send("Custom 404 message");
});

server.listen(PORT, () => {
  console.log(`Node js using express started on port ${PORT}`);
});
