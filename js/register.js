import { userManager } from './UserManager.js';
const registerForm = document.getElementById('register-form');
registerForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const user = { username, password };
    const newUser = userManager.register(user);
    if (newUser) {
        // Attempt to log in the user after successful registration
        if (userManager.login(username, password)) {
            window.location.href = 'index.html';
        }
        else {
            alert("Inscription réussie, mais erreur lors de la connexion.");
        }
    }
    else {
        alert("Erreur lors de l'inscription.");
    }
};
