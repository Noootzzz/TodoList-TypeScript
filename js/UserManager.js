class UserManager {
    register(user) {
        const users = this.getUsers();
        if (users.find(u => u.username === user.username)) {
            alert("Ce nom est déjà utilisé.");
            return false;
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    login(username, password) {
        const users = this.getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            return true;
        }
        return false;
    }
    logout() {
        localStorage.removeItem('loggedInUser');
        // Redirect to login page
        window.location.href = 'login.html';
    }
    getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }
}
// Utilisation
export const userManager = new UserManager();
// S'inscrire
// userManager.register({username: 'test', password: 'password'});
// userManager.register({username: 'test2', password: 'password2'});
// userManager.register({username: 'test3', password: 'password3'});
// Se connecter
// userManager.login('test', 'password');
// userManager.login('test2', 'password2');
// userManager.login('test3', 'password3'); 
// Se déconnecter
// userManager.logout();
