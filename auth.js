/* ===== AUTH.JS - Funciones de autenticación ===== */

const NotificationManager = {
    show(message, type = 'error', duration = 4000) {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, duration);
    },
    error(message) { this.show(message, 'error'); },
    success(message) { this.show(message, 'success'); }
};

const AuthValidator = {
    isValidUsername(username) {
        return username.trim().length >= 3;
    },
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    isValidPassword(password) {
        return password.trim().length >= 6;
    }
};

// ===== LOGIN HANDLER =====
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Cargar datos guardados
    window.addEventListener('load', function() {
        const savedUsername = localStorage.getItem('savedUsername');
        if (savedUsername && localStorage.getItem('rememberMe') === 'true') {
            usernameInput.value = savedUsername;
            rememberMeCheckbox.checked = true;
        }
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Validar campos vacíos
        if (!username) {
            NotificationManager.error('Por favor ingresa un usuario');
            usernameInput.focus();
            return;
        }

        if (!password) {
            NotificationManager.error('Por favor ingresa tu contraseña');
            passwordInput.focus();
            return;
        }

        // Validar que el usuario exista
        const registeredUser = localStorage.getItem('user_' + username);
        if (!registeredUser) {
            NotificationManager.error('El usuario no existe. Por favor regístrate primero.');
            usernameInput.focus();
            return;
        }

        // Validar contraseña
        const userData = JSON.parse(registeredUser);
        if (userData.password !== password) {
            NotificationManager.error('Contraseña incorrecta. Intenta de nuevo.');
            passwordInput.focus();
            return;
        }

        // Guardar preferencias
        if (rememberMeCheckbox.checked) {
            localStorage.setItem('savedUsername', username);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedUsername');
            localStorage.removeItem('rememberMe');
        }

        // Crear sesión
        const now = new Date().toISOString();
        localStorage.setItem('currentUser', username);
        localStorage.setItem('employeeName', username);
        localStorage.setItem('employeeRole', 'Empleado');
        localStorage.setItem('loginTime', now);

        NotificationManager.success(`¡Bienvenido ${username} a CHIPAE!`);

        // Redirigir
        setTimeout(() => {
            window.location.href = 'Empleados.html';
        }, 1500);
    });

    // Enter para enviar
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') loginForm.submit();
    });
}

// ===== REGISTRO HANDLER =====
if (document.getElementById('registerForm')) {
    const registerForm = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const acceptTermsCheckbox = document.getElementById('acceptTerms');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const acceptTerms = acceptTermsCheckbox.checked;

        // Validaciones
        if (!username) {
            NotificationManager.error('Por favor ingresa un usuario');
            usernameInput.focus();
            return;
        }

        if (!AuthValidator.isValidUsername(username)) {
            NotificationManager.error('El usuario debe tener al menos 3 caracteres');
            usernameInput.focus();
            return;
        }

        if (!email) {
            NotificationManager.error('Por favor ingresa tu correo electrónico');
            emailInput.focus();
            return;
        }

        if (!AuthValidator.isValidEmail(email)) {
            NotificationManager.error('Por favor ingresa un correo electrónico válido');
            emailInput.focus();
            return;
        }

        if (!password) {
            NotificationManager.error('Por favor ingresa una contraseña');
            passwordInput.focus();
            return;
        }

        if (!AuthValidator.isValidPassword(password)) {
            NotificationManager.error('La contraseña debe tener al menos 6 caracteres');
            passwordInput.focus();
            return;
        }

        if (!confirmPassword) {
            NotificationManager.error('Por favor confirma tu contraseña');
            confirmPasswordInput.focus();
            return;
        }

        if (password !== confirmPassword) {
            NotificationManager.error('Las contraseñas no coinciden');
            confirmPasswordInput.focus();
            return;
        }

        if (!acceptTerms) {
            NotificationManager.error('Debes aceptar los términos y condiciones');
            acceptTermsCheckbox.focus();
            return;
        }

        // Verificar si el usuario ya existe
        if (localStorage.getItem('user_' + username)) {
            NotificationManager.error('Este usuario ya existe. Por favor elige otro nombre.');
            usernameInput.focus();
            return;
        }

        // Guardar usuario
        const user = {
            username: username,
            email: email,
            password: password,
            registeredDate: new Date().toISOString()
        };

        localStorage.setItem('user_' + username, JSON.stringify(user));

        // Crear sesión
        const now = new Date().toISOString();
        localStorage.setItem('currentUser', username);
        localStorage.setItem('employeeName', username);
        localStorage.setItem('employeeRole', 'Empleado');
        localStorage.setItem('loginTime', now);

        NotificationManager.success('¡Bienvenido ' + username + ' a CHIPAE! Tu cuenta ha sido creada exitosamente.');

        // Limpiar formulario
        registerForm.reset();

        // Redirigir
        setTimeout(() => {
            window.location.href = 'Empleados.html';
        }, 1500);
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
        if (passwordInput.value && passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.style.borderColor = '#ff6b6b';
        } else if (passwordInput.value === confirmPasswordInput.value) {
            confirmPasswordInput.style.borderColor = '#d4a574';
        }
    });

    // Enter para enviar
    confirmPasswordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') registerForm.submit();
    });
}

console.log('Sistema de autenticación CHIPAE cargado');
