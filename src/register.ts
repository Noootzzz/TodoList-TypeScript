import { userManager } from './UserManager.js';
import { User } from './interface.js';

const registerForm = document.getElementById('register-form') as HTMLFormElement;

registerForm.onsubmit = (e) => {
    e.preventDefault();
    const username = (document.getElementById('register-username') as HTMLInputElement).value;
    const password = (document.getElementById('register-password') as HTMLInputElement).value;
    const user: User = { username, password };

    const newUser = userManager.register(user);

    if (newUser) {
        // Attempt to log in the user after successful registration
        if (userManager.login(username, password)) {
            window.location.href = 'index.html';
        } else {
            alert("Inscription réussie, mais erreur lors de la connexion.");
        }
    } else {
        alert("Erreur lors de l'inscription.");
    }
};