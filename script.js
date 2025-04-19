const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const completedTasksBtn = document.getElementById('completedTasks');
const allTasksBtn = document.getElementById('allTasks');
const pendingTasksBtn = document.getElementById('pendingTasks');
const clearAllBtn = document.getElementById('clearAllBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    // Filter tasks based on the selected filter type
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') {
            return task.completed;
        }
        if (filter === 'pending') {
            return !task.completed;
        }
        return true; // If no filter is set, show all tasks
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add(task.completed ? 'completed' : 'pending');
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="toggleBtn" onclick="toggleTaskCompletion(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="deleteBtn" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add a task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';  // Clear the input field after adding
        renderTasks();         // Re-render task list
    }
});

// Toggle task completion (Complete or Undo)
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();  // Re-render after toggling completion status
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();  // Re-render after deleting a task
}

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
    tasks = [];  // Empty the tasks array
    renderTasks();  // Re-render task list
});

// Filter buttons event listeners
completedTasksBtn.addEventListener('click', () => {
    renderTasks('completed');  // Show only completed tasks
});

allTasksBtn.addEventListener('click', () => {
    renderTasks('all');  // Show all tasks
});

pendingTasksBtn.addEventListener('click', () => {
    renderTasks('pending');  // Show only pending tasks
});

// Initial render
renderTasks();