class TaskManager {
    addTask(task) {
        const tasks = this.getTasks(task.userId);
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    validateTask(taskId) {
        const tasks = this.getAllTasks();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = true;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    deleteTask(taskId) {
        let tasks = this.getAllTasks();
        tasks = tasks.filter(t => t.id !== taskId || t.status);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    getTasks(userId) {
        const tasks = this.getAllTasks();
        return tasks.filter(t => t.userId === userId);
    }
    getAllTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }
}
// Utilisation
export const taskManager = new TaskManager();
