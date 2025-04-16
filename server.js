const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const tasksFile = 'tasks.json';

app.use(express.static('public'));
app.use(express.json());

// Load tasks
app.get('/api/tasks', (req, res) => {
  fs.readFile(tasksFile, (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    res.json(JSON.parse(data));
  });
});

// Add new task
app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  fs.readFile(tasksFile, (err, data) => {
    const tasks = JSON.parse(data);
    newTask.id = Date.now();
    tasks.push(newTask);
    fs.writeFile(tasksFile, JSON.stringify(tasks), () => {
      res.status(201).json(newTask);
    });
  });
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  fs.readFile(tasksFile, (err, data) => {
    let tasks = JSON.parse(data);
    tasks = tasks.filter(t => t.id !== taskId);
    fs.writeFile(tasksFile, JSON.stringify(tasks), () => {
      res.status(200).json({ message: 'Deleted' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
