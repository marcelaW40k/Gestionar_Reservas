document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formRegistro');
    
    mostrarUsuariosEnConsola();
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        limpiarErrores();
        
        const nombre = document.getElementById('nombreCompleto').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        let isValid = true;
        
        if (nombre === '') {
            mostrarError('errorNombre', 'El nombre completo es obligatorio');
            isValid = false;
        } else if (nombre.length < 3) {
            mostrarError('errorNombre', 'El nombre debe tener al menos 3 caracteres');
            isValid = false;
        }
        
        if (email === '') {
            mostrarError('errorEmail', 'El correo electrónico es obligatorio');
            isValid = false;
        } else if (!validarEmail(email)) {
            mostrarError('errorEmail', 'Ingrese un correo electrónico válido (ejemplo: usuario@dominio.com)');
            isValid = false;
        } else if (emailExiste(email)) {
            mostrarError('errorEmail', 'Este correo electrónico ya está registrado');
            isValid = false;
        }
        
        if (telefono === '') {
            mostrarError('errorTelefono', 'El número de teléfono es obligatorio');
            isValid = false;
        } else if (!validarTelefono(telefono)) {
            mostrarError('errorTelefono', 'Ingrese un número de teléfono válido (mínimo 7 dígitos)');
            isValid = false;
        }
        
        if (password === '') {
            mostrarError('errorPassword', 'La contraseña es obligatoria');
            isValid = false;
        } else if (password.length < 6) {
            mostrarError('errorPassword', 'La contraseña debe tener al menos 6 caracteres');
            isValid = false;
        }
        
        if (confirmPassword === '') {
            mostrarError('errorConfirmPassword', 'Debe confirmar su contraseña');
            isValid = false;
        } else if (password !== confirmPassword) {
            mostrarError('errorConfirmPassword', 'Las contraseñas no coinciden');
            isValid = false;
        }
        
        if (isValid) {
            const usuario = {
                id: Date.now(),
                nombreCompleto: nombre,
                email: email,
                telefono: telefono,
                password: password,
                rol: "usuario",
                fechaRegistro: new Date().toISOString()
            };
            
            guardarUsuario(usuario);
            console.log(JSON.stringify(usuario, null, 2));
            mostrarUsuariosEnConsola();
            
            const mensajeExito = document.getElementById('mensajeExito');
            mensajeExito.style.display = 'block';
            
            setTimeout(() => {
                form.reset();
                resetearEtiquetas();
            }, 2000);
            
            setTimeout(() => {
                mensajeExito.style.display = 'none';
            }, 5000);
        }
    });
    
    function guardarUsuario(usuario) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log(`📦 Usuario guardado en localStorage. Total: ${usuarios.length} usuarios`);
    }
    
    function emailExiste(email) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuarios.some(usuario => usuario.email === email);
    }
    
    function mostrarUsuariosEnConsola() {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        if (usuarios.length === 0) {
            console.log('📭 No hay usuarios registrados aún');
        } else {
            console.log(`👥 Usuarios registrados (${usuarios.length}):`);
            usuarios.forEach((usuario, index) => {
                console.log(`${index + 1}. ${usuario.nombreCompleto} - ${usuario.email}`);
            });
        }
    }
    
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function validarTelefono(telefono) {
        const digitos = telefono.replace(/\D/g, '');
        return digitos.length >= 7;
    }
    
    function mostrarError(elementId, mensaje) {
        const errorSpan = document.getElementById(elementId);
        errorSpan.textContent = mensaje;
        errorSpan.style.display = 'block';
    }
    
    function limpiarErrores() {
        const errores = document.querySelectorAll('.error');
        errores.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }
    
    function resetearEtiquetas() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
            input.dispatchEvent(new Event('input'));
        });
    }
});