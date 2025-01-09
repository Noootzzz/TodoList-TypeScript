import { userManager } from './UserManager.js';
import { displayTasks } from './DisplayTasks.js';

const loginForm = document.getElementById('login-form') as HTMLFormElement;

loginForm.onsubmit = (e) => {
    e.preventDefault();
    const username = (document.getElementById('login-username') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;

    const user = userManager.login(username, password);

    if (user) {
        alert("Connexion réussie.");
        window.location.href = 'index.html';
    } else {
        alert("Erreur lors de la connexion.");
    }
};