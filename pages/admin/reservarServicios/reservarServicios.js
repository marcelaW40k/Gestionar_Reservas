// import { btnReservar } from "../../catalogoServicios/catalogoServicios.js";

const container = document.getElementById('reservas_container');
const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

const enlaces = document.querySelectorAll('.menu-item');// Seleccionar todos los enlaces con la clase 'menu-item'
let texto = document.getElementById("texto");
let contenedorImagen = document.getElementById("contenedor_imagen");

// 2. Añadir un evento 'click' a cada enlace
enlaces.forEach(enlace => {
    enlace.addEventListener('click', function() {
    
        // 3. Eliminar la clase 'activo' de todos los enlaces
        enlaces.forEach(link => link.classList.remove('activo'));
    
        // 4. Añadir la clase 'activo' al enlace seleccionado
        this.classList.add('activo');
    });
});

function renderizarReservas() {
    if (reservas.length === 0) {
        container.innerHTML = "<p>No hay reservas aún</p>";
        return;
    }
    reservas.forEach(reserva => {
        const contenidoReserva = document.createElement("div")
        contenidoReserva.className = "contenido_reserva"
        contenidoReserva.classList.add("row");
        const precioFormateado = reserva.precio.toLocaleString('es-CO');
        const titulo = document.createElement("h1");
        titulo.textContent = reserva.nombre;
        
        const descripcion = document.createElement("p");
        descripcion.textContent = reserva.descripcion;
        
        const imagen = document.createElement("img")
        imagen.src = reserva.imagen;
       
        const texto = document.createElement("div");
        texto.classList.add("texto","col");
        texto.appendChild(titulo);
        texto.appendChild(descripcion);
        const contenedorImagen = document.createElement("div")
        contenedorImagen.classList.add("contenedor_imagen");
        contenedorImagen.appendChild(imagen);
        const contenedorPrecio = document.createElement("div");
        contenedorPrecio.className="contenedor_precio";
        contenedorPrecio.classList.add("row");
        const tituloPrecio = document.createElement("h1");
        tituloPrecio.classList.add("col")
        tituloPrecio.textContent = reserva.nombre;
        const precio = document.createElement("h1");
        precio.classList.add("precio", "col");
        precio.textContent = `$${precioFormateado}`;

        contenidoReserva.appendChild(texto);
        contenidoReserva.appendChild(contenedorImagen);
        contenedorPrecio.appendChild(tituloPrecio);
        contenedorPrecio.appendChild(precio)
        container.appendChild(contenidoReserva);
        container.appendChild(contenedorPrecio);
        
        
    });
  
}
document.addEventListener('DOMContentLoaded', renderizarReservas);