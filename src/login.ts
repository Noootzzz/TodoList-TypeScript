import { userManager } from './UserManager.js';
import { taskManager } from './TaskManager.js';

const loginForm = document.getElementById('login-form') as HTMLFormElement;

loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const username = (document.getElementById('login-username') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;

    const loginSuccess = await userManager.login(username, password);

    if (loginSuccess) {
        window.location.href = 'index.html';
    } else {
        alert("Erreur lors de la connexion.");
    }
};