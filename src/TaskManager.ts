import { Task } from './interface.js';

class TaskManager {
    addTask(task: Task): void {
        const tasks = this.getTasks(task.userId);
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    validateTask(taskId: string): void {
        const tasks = this.getAllTasks();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = true;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    deleteTask(taskId: string): void {
        let tasks = this.getAllTasks();
        tasks = tasks.filter(t => t.id !== taskId || t.status);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks(userId: string): Task[] {
        const tasks = this.getAllTasks();
        return tasks.filter(t => t.userId === userId);
    }

    displayTasks(): void {
        const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
        if (!user.username) return;

        const taskList = document.getElementById('task-list') as HTMLUListElement;
        taskList.innerHTML = '';
        
        const tasks = this.getTasks(user.username);

        if (tasks.length === 0) {
            const noTaskMessage = document.createElement('p');
            noTaskMessage.textContent = "Aucune tâche.";
            taskList.appendChild(noTaskMessage);
            return;
        }

        tasks.sort((task1, task2) => {
            const statusComparison = Number(task1.status) - Number(task2.status);
            if (statusComparison === 0) {
                return new Date(task1.deadline).getTime() - new Date(task2.deadline).getTime();
            }
            return statusComparison;
        });
        
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';

            taskCard.innerHTML = `
                <i>${task.status ? '🟢 Fait' : '⭕ À faire'}</i>
                <kbd>Deadline : ${new Date(task.deadline).toLocaleDateString()}</kbd>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <div>
                    <button class="validate" data-id="${task.id}">Valider</button>
                    <button class="delete" data-id="${task.id}">Supprimer</button>
                </div>
            `;

            if(task.status) {
                taskCard.classList.add('validated');
            }

            // Event listeners for validate and delete buttons
            taskCard.querySelector('.validate')!.addEventListener('click', () => {
                this.validateTask(task.id);
                this.displayTasks();
            });

            taskCard.querySelector('.delete')!.addEventListener('click', () => {
                this.deleteTask(task.id);
                this.displayTasks();
            });

            taskList.appendChild(taskCard);
        });
    }

    private getAllTasks(): Task[] {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }
}

// Utilisation
export const taskManager = new TaskManager();