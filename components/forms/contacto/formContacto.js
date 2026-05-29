// Validar que el nombre no esté vacío
function validarNombre(nombre) {
    return nombre.trim() !== '';
}

// Validar que el correo tenga formato correcto
function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

// Validar que el teléfono tenga solo números y entre 9 y 15 dígitos
function validarTelefono(telefono) {
    if (telefono.trim() === '') {
        return true;
    }
    
    const telefonoLimpio = telefono.replace(/[\s\-\(\)\+]/g, '');
    const soloNumeros = /^\d+$/.test(telefonoLimpio);
    const longitudValida = telefonoLimpio.length >= 9 && telefonoLimpio.length <= 15;
    
    return soloNumeros && longitudValida;
}

// Validar que el mensaje no esté vacío
function validarMensaje(mensaje) {
    return mensaje.trim() !== '';
}

// Limpiar errores
function limpiarError(campoId, errorId) {
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) errorSpan.textContent = '';
}

// Mostrar error
function mostrarError(errorId, mensaje) {
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) errorSpan.textContent = mensaje;
}

// Validar todo el formulario
function validarFormulario() {
    let esValido = true;
    
    const nombre = document.getElementById('nombre').value;
    if (!validarNombre(nombre)) {
        mostrarError('errorNombre', 'El nombre es obligatorio');
        esValido = false;
    } else {
        limpiarError('nombre', 'errorNombre');
    }
    
    const correo = document.getElementById('correo').value;
    if (!validarCorreo(correo)) {
        mostrarError('errorCorreo', 'Ingrese un correo válido (ejemplo@dominio.com)');
        esValido = false;
    } else {
        limpiarError('correo', 'errorCorreo');
    }
    
    const telefono = document.getElementById('telefono').value;
    if (!validarTelefono(telefono)) {
        mostrarError('errorTelefono', 'Ingrese solo números (9 a 15 dígitos)');
        esValido = false;
    } else {
        limpiarError('telefono', 'errorTelefono');
    }
    
    const mensaje = document.getElementById('mensaje').value;
    if (!validarMensaje(mensaje)) {
        mostrarError('errorMensaje', 'El mensaje es obligatorio');
        esValido = false;
    } else {
        limpiarError('mensaje', 'errorMensaje');
    }
    
    return esValido;
}

// Elementos del DOM
const formulario = document.getElementById('formContacto');
const mensajeExito = document.getElementById('mensajeEnvio');
const mensajeEnviando = document.getElementById('mensajeEnviando');

formulario.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validar antes de enviar
    if (!validarFormulario()) {
        return;
    }
    
    // Mostrar mensaje de "enviando..."
    mensajeEnviando.style.display = 'block';
    mensajeExito.style.display = 'none';
    
    // Deshabilitar el botón
    const boton = formulario.querySelector('.btn-enviar');
    const textoOriginal = boton.textContent;
    boton.textContent = 'Enviando...';
    boton.disabled = true;
    
    // Recolectar datos
    const formData = new FormData(formulario);
    
    try {
        const respuesta = await fetch(formulario.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        // Esperar 2 segundos para que se vea el mensaje de enviando
        setTimeout(async () => {
            // Ocultar mensaje de enviando
            mensajeEnviando.style.display = 'none';
            
            if (respuesta.ok) {
                // Limpiar el formulario
                formulario.reset();
                
                // Resetear los labels flotantes
                const inputs = formulario.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.dispatchEvent(new Event('input'));
                });
                
                // Mostrar mensaje de éxito
                mensajeExito.style.display = 'block';
                
                // Limpiar errores
                limpiarError('nombre', 'errorNombre');
                limpiarError('correo', 'errorCorreo');
                limpiarError('telefono', 'errorTelefono');
                limpiarError('mensaje', 'errorMensaje');
                
                // Ocultar mensaje de éxito después de 5 segundos
                setTimeout(() => {
                    mensajeExito.style.display = 'none';
                }, 5000);
            } else {
                alert('Hubo un error. Intenta nuevamente.');
            }
            
            // Restaurar el botón
            boton.textContent = textoOriginal;
            boton.disabled = false;
        }, 2000); // Esperar 2 segundos para simular envío
        
    } catch (error) {
        mensajeEnviando.style.display = 'none';
        alert('Error de conexión. Revisa tu internet.');
        boton.textContent = textoOriginal;
        boton.disabled = false;
    }
});