const taskList = document.getElementById("task-list");
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");

const fetchTasks = async () => {
  const res = await fetch("/tasks");
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task.title}
      <button onclick="deleteTask(${task.id})">❌</button>
    `;
    taskList.appendChild(li);
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value })
  });
  input.value = "";
  fetchTasks();
});

const deleteTask = async (id) => {
  await fetch(`/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
};

fetchTasks();
