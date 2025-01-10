import { userManager } from './UserManager.js';
import { User } from './interface.js';
import { hashPassword } from './hash.js';

const registerForm = document.getElementById('register-form') as HTMLFormElement;

registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const username = (document.getElementById('register-username') as HTMLInputElement).value;
    const password = (document.getElementById('register-password') as HTMLInputElement).value;
    const hashedPassword = await hashPassword(password); 

    const user: User = { username, password: hashedPassword };
    const newUser = userManager.register(user);

    if (newUser) {
        const loginSuccess = await userManager.login(username, password);
        if (loginSuccess) {
            window.location.href = 'index.html';
        } else {
            alert("Inscription réussie, mais erreur lors de la connexion.");
        }
    } else {
        alert("Erreur lors de l'inscription.");
    }
};