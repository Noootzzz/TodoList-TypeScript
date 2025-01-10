export const validatePassword = (password) => {
    // Vérifie que le mot de passe a au moins 6 caractères et une majuscule
    const passwordPattern = /^(?=.*[A-Z]).{6,}$/;
    return passwordPattern.test(password);
};
