// Manejo del formulario de login
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Funciones de notificación
function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: bold;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 4000);
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: bold;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Cargar datos guardados si existen
window.addEventListener('load', function() {
    const savedUsername = localStorage.getItem('savedUsername');
    const savedRememberMe = localStorage.getItem('rememberMe');

    if (savedUsername && savedRememberMe === 'true') {
        usernameInput.value = savedUsername;
        rememberMeCheckbox.checked = true;
    }
});

// Manejar envío del formulario
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const rememberMe = rememberMeCheckbox.checked;

    // Validaciones básicas
    if (!username) {
        showErrorMessage('Por favor ingresa un usuario');
        usernameInput.focus();
        return;
    }

    if (!password) {
        showErrorMessage('Por favor ingresa tu contraseña');
        passwordInput.focus();
        return;
    }

    // Validar que el usuario exista (fue registrado antes)
    const registeredUser = localStorage.getItem('user_' + username);
    
    if (!registeredUser) {
        showErrorMessage('El usuario no existe. Por favor regístrate primero.');
        usernameInput.focus();
        return;
    }

    // Validar que la contraseña sea correcta
    const userData = JSON.parse(registeredUser);
    if (userData.password !== password) {
        showErrorMessage('Contraseña incorrecta. Intenta de nuevo.');
        passwordInput.focus();
        return;
    }

    // Guardar usuario si está marcado "Recuérdame"
    if (rememberMe) {
        localStorage.setItem('savedUsername', username);
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('rememberMe');
    }

    // Guardar sesión actual del usuario
    localStorage.setItem('currentUser', username);
    localStorage.setItem('employeeName', username);
    localStorage.setItem('employeeRole', 'Empleado');
    localStorage.setItem('loginTime', new Date().toISOString());

    // Login exitoso
    console.log('Login exitoso:', { username, rememberMe });
    showSuccessMessage('¡Bienvenido ' + username + ' a CHIPAE!');
    
    // Redirigir a la página de empleados después de 1.5 segundos
    setTimeout(() => {
        window.location.href = 'Empleados.html';
    }, 1500);
});

// Permitir enter para enviar formulario
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loginForm.submit();
    }
});

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

console.log('Login de CHIPAE cargado - Colores inspirados en EVA-01');