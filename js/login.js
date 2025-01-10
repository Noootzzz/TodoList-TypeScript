import { userManager } from './UserManager.js';
const loginForm = document.getElementById('login-form');
const errorLoginElement = document.getElementById('error-login-message');
export let errorLogin = '';
loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const loginSuccess = await userManager.login(username, password);
    if (loginSuccess) {
        window.location.href = 'index.html';
    }
    else {
        errorLogin = 'Erreur lors de la connexion, veuillez vérifier vos informations.';
        errorLoginElement.textContent = errorLogin;
    }
};
