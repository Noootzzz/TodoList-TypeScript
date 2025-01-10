import { userManager } from './UserManager.js';

const loginForm = document.getElementById('login-form') as HTMLFormElement;
const errorLoginElement = document.getElementById('error-login-message') as HTMLParagraphElement;
export let errorLogin: string = '';

loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const username = (document.getElementById('login-username') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;

    const loginSuccess = await userManager.login(username, password);

    if (loginSuccess) {
        window.location.href = 'index.html';
    } else {
        errorLogin = 'Erreur lors de la connexion, veuillez vérifier vos informations.';
        errorLoginElement.textContent = errorLogin;
    }
};