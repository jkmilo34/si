// Manejo del formulario de registro
const registerForm = document.getElementById('registerForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const acceptTermsCheckbox = document.getElementById('acceptTerms');

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

// Manejar envío del formulario
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const acceptTerms = acceptTermsCheckbox.checked;

    // Validaciones
    if (!username) {
        showErrorMessage('Por favor ingresa un usuario');
        usernameInput.focus();
        return;
    }

    if (username.length < 3) {
        showErrorMessage('El usuario debe tener al menos 3 caracteres');
        usernameInput.focus();
        return;
    }

    if (!email) {
        showErrorMessage('Por favor ingresa tu correo electrónico');
        emailInput.focus();
        return;
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showErrorMessage('Por favor ingresa un correo electrónico válido');
        emailInput.focus();
        return;
    }

    if (!password) {
        showErrorMessage('Por favor ingresa una contraseña');
        passwordInput.focus();
        return;
    }

    if (password.length < 6) {
        showErrorMessage('La contraseña debe tener al menos 6 caracteres');
        passwordInput.focus();
        return;
    }

    if (!confirmPassword) {
        showErrorMessage('Por favor confirma tu contraseña');
        confirmPasswordInput.focus();
        return;
    }

    if (password !== confirmPassword) {
        showErrorMessage('Las contraseñas no coinciden');
        confirmPasswordInput.focus();
        return;
    }

    if (!acceptTerms) {
        showErrorMessage('Debes aceptar los términos y condiciones');
        acceptTermsCheckbox.focus();
        return;
    }

    // Guardar usuario en localStorage (simulación)
    const user = {
        username: username,
        email: email,
        password: password, // En una aplicación real, esto NO debería guardarse así
        registeredDate: new Date().toISOString()
    };

    localStorage.setItem('user_' + username, JSON.stringify(user));
    
    // Guardar sesión actual del usuario
    localStorage.setItem('currentUser', username);
    localStorage.setItem('employeeName', username);
    localStorage.setItem('employeeRole', 'Empleado');
    localStorage.setItem('loginTime', new Date().toISOString());

    console.log('Registro exitoso:', { username, email });
    showSuccessMessage('¡Bienvenido ' + username + ' a CHIPAE! Tu cuenta ha sido creada exitosamente.');
    
    // Limpiar formulario
    registerForm.reset();
    
    // Redirigir a empleados después de 1.5 segundos
    setTimeout(() => {
        window.location.href = 'Empleados.html';
    }, 1500);
});

// Permitir enter para enviar formulario
confirmPasswordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        registerForm.submit();
    }
});

// Validación en tiempo real de contraseñas
passwordInput.addEventListener('input', function() {
    if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.style.borderColor = '#ff6b6b';
    } else {
        confirmPasswordInput.style.borderColor = '';
    }
});

confirmPasswordInput.addEventListener('input', function() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.style.borderColor = '#ff6b6b';
    } else {
        confirmPasswordInput.style.borderColor = '#d4a574';
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

console.log('Registro de CHIPAE cargado');
