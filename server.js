const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync("tasks.json"));
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync("tasks.json"));
  const newTask = { id: Date.now(), title: req.body.title };
  tasks.push(newTask);
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  res.status(201).json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  let tasks = JSON.parse(fs.readFileSync("tasks.json"));
  tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  res.status(200).json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
