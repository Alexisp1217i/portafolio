// 1. Efecto del Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Animaciones de revelado al hacer scroll
const revealElements = document.querySelectorAll('.reveal');
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        }
    });
};
const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));

// 3. Formulario funcional
const form = document.getElementById('contactForm');
const submitBtn = document.querySelector('.btn-submit');

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...';
    submitBtn.style.opacity = '0.7';
    submitBtn.style.pointerEvents = 'none';

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            submitBtn.textContent = 'Mensaje Enviado Correctamente';
            submitBtn.style.backgroundColor = '#10b981';
            submitBtn.style.color = '#fff';
            form.reset();
        } else {
            submitBtn.textContent = 'Error al enviar';
            submitBtn.style.backgroundColor = '#ef4444';
        }
    })
    .catch(error => {
        submitBtn.textContent = 'Error de conexión';
    })
    .finally(() => {
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
            submitBtn.style.opacity = '1';
            submitBtn.style.pointerEvents = 'auto';
        }, 4000);
    });
});