import { User } from './interface.js';
import { hashPassword } from './hash.js';

class UserManager {
    register(user: User): boolean {
        const users = this.getUsers();
        if (users.find(u => u.username === user.username)) {
            alert("Ce nom est déjà utilisé.");
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

// S'inscrire
// userManager.register({username: 'test', password: 'password'});
// userManager.register({username: 'test2', password: 'password2'});
// userManager.register({username: 'test3', password: 'password3'});

// Se connecter
// userManager.login('test', 'password');
// userManager.login('test2', 'password2');
// userManager.login('test3', 'password3'); 

// Se déconnecter
// userManager.logout();