import { userManager } from './UserManager.js';
const loginForm = document.getElementById('login-form');
loginForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const user = userManager.login(username, password);
    if (user) {
        alert("Connexion réussie.");
        window.location.href = 'index.html';
    }
    else {
        alert("Erreur lors de la connexion.");
    }
};
