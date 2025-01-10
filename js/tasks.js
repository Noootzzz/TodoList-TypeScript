import { taskManager } from "./TaskManager.js";
const taskForm = document.getElementById('task-form');
const errorTask = document.getElementById('error-task-message');
let errorTaskMessage = '';
taskForm.onsubmit = (e) => {
    errorTask.textContent = '';
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user.username) {
        return;
    }
    const title = document.getElementById('add-task-title').value;
    const description = document.getElementById('add-task-description').value;
    const deadline = document.getElementById('add-task-deadline').value;
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime()) || deadlineDate < new Date()) {
        errorTaskMessage = "Il faut une date futur.";
        errorTask.textContent = errorTaskMessage;
        return;
    }
    const task = { id: Date.now().toString(), userId: user.username, title, description, status: false, deadline };
    taskManager.addTask(task);
    taskManager.displayTasks();
    taskForm.reset();
};
taskManager.displayTasks();
