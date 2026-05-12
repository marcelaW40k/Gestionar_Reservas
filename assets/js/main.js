// Función para actualizar el navbar según el estado de sesión del usuario
function actualizarNavbar() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const userInfo = document.getElementById('user-info');
    const accesoBotones = document.getElementById('acceso-botones');
    const userNameSpan = document.getElementById('userName');
    
    if (usuarioLogueado) {
        const usuario = JSON.parse(usuarioLogueado);
        if (userNameSpan) {
            userNameSpan.textContent = `Hola, ${usuario.nombre}`;
        }
        if (userInfo) userInfo.style.display = 'block';
        if (accesoBotones) accesoBotones.style.display = 'none';
    } else {
        if (userInfo) userInfo.style.display = 'none';
        if (accesoBotones) accesoBotones.style.display = 'block';
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    actualizarNavbar();
    window.location.href = '/index.html';
}

// Cargar navbar y configurar eventos de sesión
fetch('/components/navbar/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('header').innerHTML = html;
        actualizarNavbar();
        const btnCerrarSesion = document.getElementById('btnCerrarSesion');
        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener('click', cerrarSesion);
        }
    })
    .catch(err => console.error('Error cargando el navbar:', err));

// Cargar banner de inicio
fetch('components/bannerInicio/bannerInicio.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('bannerInicio-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el banner en index:', err));

// Cargar sección de información del index
fetch('components/infoIndex/infoIndex.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('infoIndex-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el información index:', err));

// Cargar sección de servicios destacados
fetch('/components/Servicios Destacados/ServiciosDestacados.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('serviceDes-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando servicios destacados:', err));

// Cargar sección de reseñas
fetch('components/review/review.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('review-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando los comentarios:', err));

// Cargar footer
fetch('components/footer/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el footer:', err));