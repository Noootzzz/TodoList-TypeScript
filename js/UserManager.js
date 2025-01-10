import { hashPassword } from './hash.js';
class UserManager {
    register(user) {
        const users = this.getUsers();
        if (users.find(u => u.username === user.username)) {
            alert("Ce nom est déjà utilisé.");
            return false;
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    async login(username, password) {
        const users = this.getUsers();
        const hashedPassword = await hashPassword(password);
        const user = users.find(u => u.username === username && u.password === hashedPassword);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            return true;
        }
        return false;
    }
    logout() {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    }
    getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }
}
// Utilisation
export const userManager = new UserManager();
