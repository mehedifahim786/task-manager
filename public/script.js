async function fetchTasks() {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.name;
      const del = document.createElement('button');
      del.textContent = 'Delete';
      del.onclick = () => deleteTask(task.id);
      li.appendChild(del);
      taskList.appendChild(li);
    });
  }
  
  async function addTask() {
    const input = document.getElementById('taskInput');
    const name = input.value.trim();
    if (!name) return;
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    input.value = '';
    fetchTasks();
  }
  
  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  }
  
  fetchTasks();
  