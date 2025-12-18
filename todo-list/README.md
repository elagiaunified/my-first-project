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
```
todo-list/
├── index.html # Main HTML structure
├── style.css # Styling and animations
└── script.js # Task management logic
```

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

## 🔄 Future Improvements
- Potential enhancements:
-  Add due dates and reminders
-  Implement task categories/tags
-  Add drag-and-drop reordering
-  Include task search/filter
-  Add dark mode
-  Export/import tasks
-  Add task priorities

## 📚 What I Learned
- localStorage: Browser-based data persistence
- CRUD Operations: Full Create-Read-Update-Delete cycle
- Event Handling: Form submissions, button clicks, checkboxes
- Array Methods: map(), forEach(), filter() for data manipulation
- JSON: Serializing/deserializing data for storage
- UI/UX Principles: Creating intuitive interfaces

##🤝 Contributing
- Suggestions and improvements welcome! Please open an issue or submit a pull request.

## 📄 License
- This project is open source and available under the MIT License.
- Part of my beginner web development portfolio. Check out the other projects in the main repository!

## 💾 Data Storage

- Tasks are stored using `localStorage`:
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
```

## 📱 Responsive Design
- Desktop: Two-column layout with stats sidebar
- Tablet: Stacked layout with full-width elements
- Mobile: Touch-friendly buttons, optimized spacing
- All screens: Readable fonts, appropriate sizing

## 🎨 UI/UX Features
- Visual Hierarchy: Clear distinction between sections
- Feedback: Hover states, active states, transitions
- Accessibility: Proper contrast ratios, keyboard navigation
- Intuitive Controls: Familiar interface patterns

## 🧪 Testing
Tested scenarios:
- ✅ Add multiple tasks
- ✅ Mark tasks as complete
- ✅ Delete individual tasks
- ✅ Clear all completed tasks
- ✅ Persistence across page refresh
- ✅ Mobile responsiveness
- ✅ Keyboard navigation

## 🚀 Running Locally
1. Clone the repository:

```bash
git clone https://github.com/yourusername/my-first-project.git
```
2. Navigate to todo-list folder:

```bash
cd my-first-project/todo-list
```
3. Open index.html in your browser

## 📝 Code Highlights
- Add Task Function
```javascript
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
```
