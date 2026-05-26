document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formLogin');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Limpiar mensajes anteriores
        limpiarErrores();
        ocultarMensajes();
        
        // Obtener valores
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        let isValid = true;
        
        // Validación de email
        if (email === '') {
            mostrarError('errorEmail', 'El correo electrónico es obligatorio');
            isValid = false;
        } else if (!validarEmail(email)) {
            mostrarError('errorEmail', 'Ingrese un correo electrónico válido');
            isValid = false;
        }
        
        // Validación de contraseña
        if (password === '') {
            mostrarError('errorPassword', 'La contraseña es obligatoria');
            isValid = false;
        }
        
        // Si es válido, verificar en localStorage
        if (isValid) {
            const usuario = verificarCredenciales(email, password);
            
            if (usuario) {
                localStorage.setItem('usuarioLogueado', JSON.stringify({
                    email: usuario.email,
                    nombre: usuario.nombreCompleto,
                    rol: usuario.rol,
                    fechaLogin: new Date().toISOString()
                }));
                
                const mensajeBienvenida = document.getElementById('mensajeBienvenida');
                mensajeBienvenida.textContent = `¡Bienvenido/a, ${usuario.nombreCompleto}!`;
                mensajeBienvenida.style.display = 'block';
                
                setTimeout(() => {
                    if (usuario.rol === 'admin') {
                        window.parent.location.href = '/pages/admin/panelDeControl/panelControl.html';
                    } else {
                        window.parent.location.href = '/index.html';
                    }
                }, 2000);
            } else {
                const mensajeError = document.getElementById('mensajeError');
                mensajeError.textContent = '❌ Correo electrónico o contraseña incorrectos';
                mensajeError.style.display = 'block';
            }
        }
    });
    
    // Función para verificar credenciales en localStorage
    function verificarCredenciales(email, password) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuarios.find(usuario => usuario.email === email && usuario.password === password);
    }
    
    // Función para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Función para mostrar errores específicos
    function mostrarError(elementId, mensaje) {
        const errorSpan = document.getElementById(elementId);
        errorSpan.textContent = mensaje;
        errorSpan.style.display = 'block';
    }
    
    // Función para limpiar errores específicos
    function limpiarErrores() {
        const errores = document.querySelectorAll('.error');
        errores.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }
    
    // Función para ocultar mensajes de bienvenida/error
    function ocultarMensajes() {
        const mensajeBienvenida = document.getElementById('mensajeBienvenida');
        const mensajeError = document.getElementById('mensajeError');
        if (mensajeBienvenida) mensajeBienvenida.style.display = 'none';
        if (mensajeError) mensajeError.style.display = 'none';
    }
});