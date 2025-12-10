// Get DOM elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');

// Load tasks from localStorage on page load
window.onload = function() {
    loadTasks();
    updateStats();
};

// Add task when button is clicked
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    createTaskElement(taskText);
    saveTasks();
    taskInput.value = '';
    taskInput.focus();
    updateStats();
}

// Create a new task element
function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (isCompleted) li.classList.add('completed');
    
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''} 
               onchange="toggleTask(this)">
        <span class="task-text">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">
            <i class="fas fa-trash"></i> Delete
        </button>
    `;
    
    taskList.appendChild(li);
}

// Toggle task completion
function toggleTask(checkbox) {
    const taskItem = checkbox.parentElement;
    taskItem.classList.toggle('completed');
    saveTasks();
    updateStats();
}

// Delete a task
function deleteTask(button) {
    if (confirm('Are you sure you want to delete this task?')) {
        const taskItem = button.parentElement;
        taskList.removeChild(taskItem);
        saveTasks();
        updateStats();
    }
}

// Clear all completed tasks
function clearCompleted() {
    const completedTasks = document.querySelectorAll('.task-item.completed');
    
    if (completedTasks.length === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    if (confirm(`Clear ${completedTasks.length} completed task(s)?`)) {
        completedTasks.forEach(task => task.remove());
        saveTasks();
        updateStats();
    }
}

// Clear all tasks
function clearAll() {
    if (taskList.children.length === 0) {
        alert('No tasks to clear!');
        return;
    }
    
    if (confirm('Are you sure you want to delete ALL tasks?')) {
        taskList.innerHTML = '';
        saveTasks();
        updateStats();
    }
}

// Update statistics
function updateStats() {
    const allTasks = document.querySelectorAll('.task-item');
    const completed = document.querySelectorAll('.task-item.completed');
    
    totalTasks.textContent = allTasks.length;
    completedTasks.textContent = completed.length;
    pendingTasks.textContent = allTasks.length - completed.length;
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        const text = item.querySelector('.task-text').textContent;
        const completed = item.classList.contains('completed');
        tasks.push({ text, completed });
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => createTaskElement(task.text, task.completed));
    }
}

// Add task when Enter key is pressed
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
