import { userManager } from './UserManager.js';
const logoutButton = document.getElementById('logout-button');
logoutButton.onclick = () => {
    userManager.logout();
};
