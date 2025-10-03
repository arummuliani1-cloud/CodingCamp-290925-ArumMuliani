let tasks = [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<p>🌸 Belum ada tugas hari ini!</p>";
    return;
  }

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task" + (task.done ? " done" : "");

    taskDiv.innerHTML = `
      <div class="info">
        <strong>${task.text}</strong><br/>
        <small>${task.date} • ${task.category}</small>
      </div>
      <div class="actions">
        <button onclick="toggleDone(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(taskDiv);
  });
}

function addTask() {
  const text = document.getElementById("taskText").value.trim();
  const date = document.getElementById("taskDate").value;
  const category = document.getElementById("taskCategory").value.trim();

  if (!text || !date || !category) {
    alert("Isi semua kolom tugas yaa 💡");
    return;
  }

  tasks.push({ text, date, category, done: false });
  renderTasks();

  document.getElementById("taskText").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskCategory").value = "";
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function sendReminder() {
  const status = document.getElementById("reminderStatus");
  status.textContent = "🔔 Jangan lupa cek tugas hari ini yaa 💕";
  setTimeout(() => {
    status.textContent = "";
  }, 5000);
}

renderTasks();