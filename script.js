// =================================================================
// 1. VARIABEL GLOBAL & FUNGSI DASAR
// =================================================================
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('taskText');
const dateInput = document.getElementById('taskDate');
const categoryInput = document.getElementById('taskCategory');
const todoList = document.getElementById('todo-list');

let tasks = [];

// Menyimpan array tugas ke Local Storage
function saveTasks() {
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Memuat data tugas dari Local Storage
function loadTasks() {
    const savedTasks = localStorage.getItem('todos');

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// =================================================================
// 2. FUNGSI TAMPILAN (RENDER) & FILTER
// =================================================================

// Fungsi untuk penyaringan (dipanggil saat dropdown filter diubah)
function filterTasks() {
    const filterValue = document.getElementById('filterTasks').value;
    renderTasks(filterValue);
}

// Fungsi utama untuk menampilkan tugas (sudah mendukung filter)
function renderTasks(filterValue = 'all') {
    todoList.innerHTML = '';

    let filteredTasks = tasks;

    // Logika penyaringan
    if (filterValue === 'pending') {
        filteredTasks = tasks.filter(task => !task.isCompleted);
    } else if (filterValue === 'completed') {
        filteredTasks = tasks.filter(task => task.isCompleted);
    }

    if (filteredTasks.length === 0) {
        todoList.innerHTML = '<p style="text-align: center; color: #1e88e5;">🧊 Tidak ada tugas di kategori ini! 🧊</p>';
        return;
    }

    filteredTasks.forEach(task => {
        const li = createTaskElement(task);
        todoList.appendChild(li);
    });
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (task.isCompleted) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <span class="task-info">
            <strong>${task.text}</strong> 
            <small>(${task.date})</small>
            <span class="category">${task.category}</span>
        </span>
        <div class="actions">
            <button class="complete-btn" onclick="toggleComplete('${task.id}')">
                ${task.isCompleted ? '❌ Belum Selesai' : '✔️ Selesai'}
            </button>
            <button class="delete-btn" onclick="deleteTask('${task.id}')">🗑 Hapus</button>
        </div>
    `;
    return li;
}

// =================================================================
// 3. FUNGSI AKSI (ADD, DELETE, COMPLETE)
// =================================================================

function addTask(event) {
    event.preventDefault(); 

    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;
    const taskCategory = categoryInput.value.trim() || 'Umum';

    if (taskText === '' || taskDate === '') {
        alert('Tugas dan Tanggal harus diisi!');
        return;
    }

    const newTask = {
        id: Date.now().toString(),
        text: taskText,
        date: taskDate,
        category: taskCategory,
        isCompleted: false
    };

    tasks.push(newTask);
    
    saveTasks(); 
    renderTasks(); 

    taskInput.value = '';
    dateInput.value = '';
    categoryInput.value = '';
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(); 
    renderTasks();
}

function toggleComplete(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex > -1) {
        tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
        saveTasks(); 
        renderTasks();
    }
}

// Tambahkan kembali fungsi pengingat (jika tombolnya ada di HTML)
function sendReminder() {
    const status = document.getElementById("reminderStatus");
    status.textContent = "🔔 Jangan lupa cek tugas hari ini yaa ✨";
    setTimeout(() => {
        status.textContent = "";
    }, 5000);
}


// =================================================================
// 4. PENGATURAN AWAL
// =================================================================

if (taskForm) {
    taskForm.addEventListener('submit', addTask);
}

document.addEventListener('DOMContentLoaded', loadTasks);