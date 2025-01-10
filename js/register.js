import { userManager } from './UserManager.js';
import { hashPassword } from './hash.js';
const registerForm = document.getElementById('register-form');
registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const hashedPassword = await hashPassword(password);
    const user = { username, password: hashedPassword };
    const newUser = userManager.register(user);
    if (newUser) {
        const loginSuccess = await userManager.login(username, password);
        if (loginSuccess) {
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
