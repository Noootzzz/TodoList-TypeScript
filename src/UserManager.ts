import { User } from './interface.js';
import { hashPassword } from './hash.js';

class UserManager {
    register(user: User): boolean {
        const users = this.getUsers();
        const errorRegisterElement = document.getElementById('error-register-user') as HTMLParagraphElement;
        if (users.find(u => u.username === user.username)) {
            errorRegisterElement.textContent = "Ce nom est déjà utilisé.";
            return false;
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    async login(username: string, password: string): Promise<boolean> {
        const users = this.getUsers();
        const hashedPassword = await hashPassword(password);
        const user = users.find(u => u.username === username && u.password === hashedPassword);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    }   

    private getUsers(): User[] {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }
}

// Utilisation
export const userManager = new UserManager();