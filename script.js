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

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') {
            return task.completed;
        }
        if (filter === 'pending') {
            return !task.completed;
        }
        return true; 
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

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = ''; 
        renderTasks();     
    }
});

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks(); 
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

clearAllBtn.addEventListener('click', () => {
    tasks = []; 
    renderTasks();
});


completedTasksBtn.addEventListener('click', () => {
    renderTasks('completed');
});

allTasksBtn.addEventListener('click', () => {
    renderTasks('all');
});

pendingTasksBtn.addEventListener('click', () => {
    renderTasks('pending');
});

renderTasks();