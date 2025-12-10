# ✅ To-Do List App

A feature-rich task management application with localStorage persistence and clean UI.

![To-Do List Preview](https://img.shields.io/badge/Status-Complete-success) ![Technology](https://img.shields.io/badge/Tech-HTML/CSS/JS-blue) ![Storage](https://img.shields.io/badge/Storage-localStorage-green)

## 🚀 Live Demo
**[Try it here!](https://elagiaunified.github.io/my-first-project/todo-list/)**

## ✨ Features

- **Add Tasks**: Quick input with Enter key support
- **Mark Complete**: Check off completed tasks
- **Delete Tasks**: Remove individual tasks
- **Statistics**: Real-time counts (total, completed, pending)
- **Data Persistence**: Tasks saved in browser (localStorage)
- **Clear Options**: Clear completed tasks or all tasks
- **Responsive Design**: Works on all devices
- **Visual Feedback**: Hover effects and transitions

## 🎯 How to Use

1. **Add a Task**: Type in the input field and press Enter or click "Add Task"
2. **Complete Task**: Click the checkbox next to any task
3. **Delete Task**: Click the red "Delete" button
4. **Clear Completed**: Remove all checked tasks at once
5. **Clear All**: Remove all tasks (with confirmation)

Your tasks are automatically saved and will reappear when you revisit the page!

## 🏗️ Project Structure
- todo-list/
- ├── index.html # Main HTML structure
- ├── style.css # Styling and animations
- └── script.js # Task management logic


## 🔧 Technical Implementation

### **HTML**
- Semantic HTML5 elements
- Form for task input
- Unordered list for task display
- Proper labeling for accessibility

### **CSS**
- Modern gradient background
- Card-based layout with shadows
- Flexbox for alignment
- Smooth transitions and hover effects
- Responsive breakpoints

### **JavaScript**
- **localStorage API**: Save/load tasks from browser storage
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Event Delegation**: Efficient event handling
- **DOM Updates**: Dynamically update task list
- **Data Validation**: Prevent empty tasks

## 💾 Data Storage

Tasks are stored using `localStorage`:
```javascript
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
