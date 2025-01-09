import { userManager } from './UserManager.js';

const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;

logoutButton.onclick = () => {
    userManager.logout();
};