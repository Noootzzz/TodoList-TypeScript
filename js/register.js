import { userManager } from './UserManager.js';
import { hashPassword } from './hash.js';
import { validatePassword } from './validPassword.js';
const registerForm = document.getElementById('register-form');
const errorRegisterElement = document.getElementById('error-register-message');
let errorRegister = '';
registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    // Validation du mot de passe
    if (!validatePassword(password)) {
        errorRegister = 'Le mot de passe doit contenir au moins 6 caractères et une majuscule.';
        errorRegisterElement.textContent = errorRegister;
        return;
    }
    // Hash du mot de passe
    const hashedPassword = await hashPassword(password);
    // Création de l'utilisateur
    const user = { username, password: hashedPassword };
    const newUser = userManager.register(user);
    // Connexion de l'utilisateur
    if (newUser) {
        const loginSuccess = await userManager.login(username, password);
        if (loginSuccess) {
            window.location.href = 'index.html';
        }
        else {
            errorRegister = 'Inscription réussie, mais erreur lors de la connexion.';
            errorRegisterElement.textContent = errorRegister;
        }
    }
    else {
        errorRegister = 'Erreur lors de l\'inscription.';
        errorRegisterElement.textContent = errorRegister;
    }
};
