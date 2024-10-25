// Generar un token de 6 dígitos
const generateToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();  // Genera un número de 6 dígitos
};

// Generar un ID de sesión único
const generateSessionId = () => {
    return 'session-' + Math.random().toString(36).substring(2, 15);  // Genera un string único
};

export { generateToken, generateSessionId }