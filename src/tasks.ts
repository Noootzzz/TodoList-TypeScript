import { taskManager } from "./TaskManager.js";
import { Task } from "./interface.js";

const taskForm = document.getElementById('task-form') as HTMLFormElement;

// Validation Function
function validateInput(value: string, message: string): boolean {
    if (!value) {
        alert(message);
        return false;
    }
    return true;
}

taskForm.onsubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user.username) {
        alert("No user logged in.");
        return;
    }

    const title = (document.getElementById('add-task-title') as HTMLInputElement).value;
    const description = (document.getElementById('add-task-description') as HTMLTextAreaElement).value;
    const deadline = (document.getElementById('add-task-deadline') as HTMLInputElement).value;

    if (!validateInput(title, "Task title is required.")) return;
    if (!validateInput(description, "Task description is required.")) return;
    if (!validateInput(deadline, "Task deadline is required.")) return;

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime()) || deadlineDate < new Date()) {
        alert("Please enter a valid future date for the deadline.");
        return;
    }

    const task: Task = { id: Date.now().toString(), userId: user.username, title, description, status: false, deadline };
    taskManager.addTask(task);
    alert("Task added successfully.");
    taskManager.displayTasks();
    taskForm.reset();
};

taskManager.displayTasks();