/* ===== MAIN.JS - Funciones globales ===== */

// Smooth scroll para enlaces de navegación
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Actualizar clase active
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Efecto de sombra en header al scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 0) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
});

console.log('CHIPAE - Sistema de Gestión PAE cargado');
