import { taskManager } from "./TaskManager.js";
import { Task } from "./interface.js";

const taskForm = document.getElementById('task-form') as HTMLFormElement;
const errorTask = document.getElementById('error-task-message') as HTMLParagraphElement;
let errorTaskMessage: string = '';

taskForm.onsubmit = (e) => {
    errorTask.textContent = '';
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user.username) {
        return;
    }

    const title = (document.getElementById('add-task-title') as HTMLInputElement).value;
    const description = (document.getElementById('add-task-description') as HTMLTextAreaElement).value;
    const deadline = (document.getElementById('add-task-deadline') as HTMLInputElement).value;

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime()) || deadlineDate < new Date()) {
        errorTaskMessage = "Il faut une date futur.";
        errorTask.textContent = errorTaskMessage;
        return;
    }

    const task: Task = { id: Date.now().toString(), userId: user.username, title, description, status: false, deadline };
    taskManager.addTask(task);
    taskManager.displayTasks();
    taskForm.reset();
};

taskManager.displayTasks();