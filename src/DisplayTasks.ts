import { taskManager } from './TaskManager.js';

const taskList = document.getElementById('task-list') as HTMLUListElement;

export function displayTasks() {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!user.username) return;

    const tasks = taskManager.getTasks(user.username);
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} - ${task.description} - ${task.deadline}`;
        if (!task.status) {
            const validateButton = document.createElement('button');
            validateButton.textContent = 'Validate';
            validateButton.onclick = () => {
                taskManager.validateTask(task.id);
                displayTasks();
            };
            li.appendChild(validateButton);
        }
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            taskManager.deleteTask(task.id);
            displayTasks();
        };
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}