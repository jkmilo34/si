// ============= VARIABLES GLOBALES =============
let isDropdownOpen = false;

// ============= INICIALIZACIÓN =============
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
    setupEventListeners();
});

// ============= PERFIL =============
function initializeProfile() {
    // Obtener datos del empleado (simulado, puedes traerlo de localStorage o API)
    const employeeName = localStorage.getItem('employeeName') || 'Empleado';
    const employeeRole = localStorage.getItem('employeeRole') || 'Administrador';
    
    // Actualizar nombre en la página
    document.getElementById('profileName').textContent = employeeName;
    document.getElementById('welcomeName').textContent = employeeName;
}

// ============= EVENT LISTENERS =============
function setupEventListeners() {
    // Click en botón de perfil
    const profileBtn = document.querySelector('.profile-btn');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isDropdownOpen = !isDropdownOpen;
            
            if (isDropdownOpen) {
                profileDropdown.classList.add('active');
                profileBtn.classList.add('active');
            } else {
                profileDropdown.classList.remove('active');
                profileBtn.classList.remove('active');
            }
        });
    }

    // Cerrar dropdown al hacer clic en el documento
    document.addEventListener('click', function(e) {
        const profileDropdown = document.querySelector('.profile-dropdown');
        if (profileDropdown && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('active');
            if (document.querySelector('.profile-btn')) {
                document.querySelector('.profile-btn').classList.remove('active');
            }
            isDropdownOpen = false;
        }
    });

    // Smooth scroll para los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Formulario de agregar colegio
    const colegioForm = document.getElementById('colegioForm');
    if (colegioForm) {
        colegioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddColegio();
        });
    }
}

// ============= COLEGIOS FUNCTIONS =============
function addColegio() {
    const modal = document.getElementById('colegioModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('colegioModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleAddColegio() {
    const nombre = document.getElementById('colegioNombre').value;
    const codigo = document.getElementById('colegioCodig').value;
    const ubicacion = document.getElementById('colegioUbicacion').value;
    const estudiantes = document.getElementById('colegioEstudiantes').value;

    if (nombre && codigo && ubicacion && estudiantes) {
        // Crear tarjeta de colegio
        const card = document.createElement('div');
        card.className = 'colegio-card';
        card.innerHTML = `
            <div class="card-header">
                <h4>${nombre}</h4>
                <span class="status active">Activo</span>
            </div>
            <div class="card-body">
                <p><strong>Código:</strong> ${codigo}</p>
                <p><strong>Ubicación:</strong> ${ubicacion}</p>
                <p><strong>Estudiantes:</strong> ${estudiantes}</p>
                <p><strong>Jornadas:</strong> Mañana</p>
            </div>
            <div class="card-footer">
                <button class="btn-small btn-view" onclick="viewColegio(this)">Ver</button>
                <button class="btn-small btn-edit" onclick="editColegio(this)">Editar</button>
                <button class="btn-small btn-delete" onclick="deleteColegio(this)">Eliminar</button>
            </div>
        `;

        // Agregar a la grid
        const grid = document.querySelector('.colegios-grid');
        if (grid) {
            grid.appendChild(card);
        }

        // Limpiar formulario
        document.getElementById('colegioForm').reset();

        // Cerrar modal
        closeModal();

        // Mostrar notificación
        showNotification('Colegio agregado correctamente', 'success');
    } else {
        showNotification('Por favor, complete todos los campos', 'error');
    }
}

function viewColegio(element) {
    const card = element.closest ? element.closest('.colegio-card') : element;
    const name = card.querySelector('.card-header h4').textContent;
    showNotification(`Abriendo detalles de ${name}`, 'info');
    console.log('Ver colegio:', name);
    // Aquí puedes redirigir a una página de detalles
}

function editColegio(element) {
    const card = element.closest ? element.closest('.colegio-card') : element;
    const name = card.querySelector('.card-header h4').textContent;
    showNotification(`Editando ${name}`, 'info');
    console.log('Editar colegio:', name);
    // Aquí puedes abrir un modal de edición
}

function deleteColegio(element) {
    const card = element.closest ? element.closest('.colegio-card') : element;
    const name = card.querySelector('.card-header h4').textContent;
    
    if (confirm(`¿Está seguro de que desea eliminar a ${name}?`)) {
        card.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            card.remove();
            showNotification(`${name} ha sido eliminado`, 'success');
        }, 300);
    }
}

// ============= NOTIFICACIONES =============
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos en línea para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;

    // Color según tipo
    switch(type) {
        case 'success':
            notification.style.background = '#4caf50';
            break;
        case 'error':
            notification.style.background = '#f44336';
            break;
        case 'info':
            notification.style.background = '#2196F3';
            break;
        default:
            notification.style.background = '#666';
    }

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============= CERRAR SESIÓN =============
function logout() {
    localStorage.removeItem('employeeName');
    localStorage.removeItem('employeeRole');
    localStorage.removeItem('employeeId');
    window.location.href = 'login.html';
}

// ============= ANIMACIONES EN CSS =============
// Agregar estilos de animación dinámicos
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

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

// ============= CERRAR MODAL AL HACER CLIC FUERA =============
window.addEventListener('click', function(e) {
    const modal = document.getElementById('colegioModal');
    if (modal && e.target === modal) {
        closeModal();
    }
});

// ============= FUNCIONES AUXILIARES =============
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
}

function getCurrentHour() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
}

// ============= SINCRONIZACIÓN CON LOCALSTORAGE =============
function saveEmployeeData(name, role, id) {
    localStorage.setItem('employeeName', name);
    localStorage.setItem('employeeRole', role);
    localStorage.setItem('employeeId', id);
}

function getEmployeeData() {
    return {
        name: localStorage.getItem('employeeName'),
        role: localStorage.getItem('employeeRole'),
        id: localStorage.getItem('employeeId')
    };
}
