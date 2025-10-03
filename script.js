// =================================================================
// 1. VARIABEL GLOBAL & FUNGSI DASAR
// =================================================================
// Mengambil elemen HTML menggunakan ID
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('taskText');
const dateInput = document.getElementById('taskDate');
const categoryInput = document.getElementById('taskCategory');
const todoList = document.getElementById('todo-list'); // ID WADAH TUGAS

// Array tempat semua data tugas disimpan di memori sementara
let tasks = [];

// Menyimpan array tugas ke Local Storage (Persistence)
function saveTasks() {
    // Mengubah array JavaScript menjadi string JSON agar bisa disimpan
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Memuat data tugas dari Local Storage
function loadTasks() {
    // Mendapatkan data string dari Local Storage
    const savedTasks = localStorage.getItem('todos');

    if (savedTasks) {
        // Jika ada data, ubah string JSON menjadi array JavaScript
        tasks = JSON.parse(savedTasks);
        renderTasks(); // Langsung tampilkan tugas yang tersimpan
    }
}

// =================================================================
// 2. FUNGSI TAMPILAN (RENDER)
// =================================================================

// Fungsi untuk mengosongkan dan menampilkan ulang seluruh daftar dari array 'tasks'
function renderTasks() {
    todoList.innerHTML = ''; // Kosongkan tampilan HTML saat ini

    // Jika tidak ada tugas, tampilkan pesan
    if (tasks.length === 0) {
        todoList.innerHTML = '<p style="text-align: center; color: #a05252;">🌸 Belum ada tugas hari ini!</p>';
        return;
    }

    // Loop (Perulangan) untuk setiap tugas di array 'tasks'
    tasks.forEach(task => {
        const li = createTaskElement(task);
        todoList.appendChild(li);
    });
}

// Fungsi pembantu untuk membuat elemen LI (item tugas) per tugas
function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    // Tambahkan class 'completed' jika statusnya sudah selesai (untuk styling CSS)
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
                ${task.isCompleted ? 'Belum Selesai' : 'Selesai'}
            </button>
            <button class="delete-btn" onclick="deleteTask('${task.id}')">Hapus</button>
        </div>
    `;
    return li;
}

// =================================================================
// 3. FUNGSI AKSI (ADD, DELETE, COMPLETE)
// =================================================================

function addTask(event) {
    event.preventDefault(); // Mencegah form refresh halaman

    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;
    const taskCategory = categoryInput.value.trim() || 'Umum';

    // Wajib: VALIDASI INPUT FORM
    if (taskText === '' || taskDate === '') {
        alert('Tugas dan Tanggal harus diisi!');
        return;
    }

    // Buat objek tugas baru dengan ID unik
    const newTask = {
        id: Date.now().toString(), // ID unik berdasarkan waktu
        text: taskText,
        date: taskDate,
        category: taskCategory,
        isCompleted: false
    };

    tasks.push(newTask);
    
    // Simpan ke Local Storage dan tampilkan ulang
    saveTasks(); 
    renderTasks();

    // Bersihkan formulir
    taskInput.value = '';
    dateInput.value = '';
    categoryInput.value = '';
}

function deleteTask(taskId) {
    // Filter array: membuat array baru tanpa tugas dengan ID yang cocok
    tasks = tasks.filter(task => task.id !== taskId);
    
    // Simpan ke Local Storage dan tampilkan ulang
    saveTasks(); 
    renderTasks();
}

function toggleComplete(taskId) {
    // Cari index tugas di array
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex > -1) {
        // Balik status Selesai/Belum Selesai
        tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
        
        // Simpan ke Local Storage dan tampilkan ulang
        saveTasks(); 
        renderTasks();
    }
}

// [CATATAN: FUNGSI sendReminder tidak termasuk karena tidak wajib untuk tugas inti]

// =================================================================
// 4. PENGATURAN AWAL (JALANKAN SAAT HALAMAN DIBUKA)
// =================================================================

// 1. Hubungkan Tombol Tambah ke Fungsi (dipanggil saat form disubmit)
if (taskForm) {
    taskForm.addEventListener('submit', addTask);
}

// 2. Muat Tugas yang Tersimpan saat Halaman dibuka
document.addEventListener('DOMContentLoaded', loadTasks);