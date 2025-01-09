import { userManager } from './UserManager.js';
const registerForm = document.getElementById('register-form');
registerForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const user = { username, password };
    const newUser = userManager.register(user);
    if (newUser) {
        alert("Inscription réussie.");
        window.location.href = 'index.html';
    }
    else {
        alert("Erreur lors de l'inscription.");
    }
};
