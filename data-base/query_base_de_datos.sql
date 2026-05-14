-- CREACION DE LA TABLA USUARIOS
CREATE TABLE usuarios(
	id_usuario SERIAL NOT NULL,
	nombre VARCHAR(200) NOT NULL,
	correo VARCHAR(200) NOT NULL,
	telefono VARCHAR(20) NOT NULL,
	contrasena VARCHAR(200) NOT NULL,
	rol VARCHAR(20) NOT NULL,
	estado BOOLEAN DEFAULT TRUE,
 	CONSTRAINT usuarios_pk PRIMARY KEY(id_usuario),
	CONSTRAINT usuarios_correo UNIQUE(correo)
);

--CREACION DE LA TABLA SERVICIOS
CREATE TABLE servicios(
	id_servicio SERIAL NOT NULL,
	nombre VARCHAR(200) NOT NULL,
	descripcion TEXT NOT NULL,
	url_imagen VARCHAR(300) NOT NULL,
	estado BOOLEAN DEFAULT TRUE,
	tipo VARCHAR(200) NOT NULL,
	precio DECIMAL(10,2) NOT NULL,
	CONSTRAINT servicios_pk PRIMARY KEY(id_servicio),
	CONSTRAINT servicios_precio CHECK (precio>0)
	
);

CREATE TABLE reservas(
	id_reserva SERIAL NOT NULL,
	fecha DATE NOT NULL,
	hora TIME NOT NULL,
	estado VARCHAR(50) NOT NULL,
	id_usuarios INTEGER NOT NULL,
	id_empleado INTEGER NOT NULL,
	id_servicio INTEGER NOT NULL,
	CONSTRAINT reservas_pk PRIMARY KEY(id_reserva),
	CONSTRAINT reservas_id_usuario_fk
		FOREIGN KEY (id_usuarios)
		REFERENCES usuarios(id_usuario),
	CONSTRAINT reservas_id_empleado_fk
		FOREIGN KEY (id_empleado)
		REFERENCES empleados (id_empleado),
	CONSTRAINT reservas_id_servicios_fk
		FOREIGN KEY (id_servicio)
		REFERENCES servicios(id_servicio)
	 
);
--CREANDO TABLA DE EMPLEADOS
CREATE TABLE empleados(
	id_empleado SERIAL NOT NULL,
	especialidad VARCHAR(200) NOT NULL,
	url_img VARCHAR(300) NOT NULL,
	estado BOOLEAN DEFAULT TRUE,
	id_usuario INTEGER NOT NULL,
	CONSTRAINT empleados_pk PRIMARY KEY(id_empleado),
	CONSTRAINT empleados_id_usuario_fk
		FOREIGN KEY (id_usuario)
		REFERENCES usuarios(id_usuario)
	
);
CREATE TABLE horarios(
	id_horario SERIAL NOT NULL,
	fecha DATE NOT NULL,
	hora TIME NOT NULL,
	id_empleado INTEGER NOT NULL,
	CONSTRAINT horarios_pk PRIMARY KEY(id_horario),
	CONSTRAINT horarios_id_empleado_fk
	FOREIGN KEY (id_empleado)
	REFERENCES empleados(id_empleado)
);

-- INGRESANDO REGISTROS
-- =========================
-- REGISTROS TABLA USUARIOS
-- =========================
INSERT INTO usuarios(nombre, correo, telefono, contrasena, rol) VALUES
('Carlos Perez', 'carlos@gmail.com', '3001234567', 'Carlos123', 'cliente'),
('Maria Lopez', 'maria@gmail.com', '3012345678', 'Maria123', 'cliente'),
('Andres Gomez', 'andres@gmail.com', '3023456789', 'Andres123', 'empleado'),
('Laura Martinez', 'laura@gmail.com', '3034567890', 'Laura123', 'empleado'),
('Sofia Ramirez', 'sofia@gmail.com', '3045678901', 'Sofia123', 'admin');

-- =========================
-- REGISTROS TABLA SERVICIOS
-- =========================
INSERT INTO servicios(nombre, descripcion, url_imagen, tipo, precio) VALUES
('Baño Canino', 'Servicio completo de baño para perros', 'img/bano_canino.jpg', 'Higiene', 50000),
('Corte Felino', 'Corte de pelo especializado para gatos', 'img/corte_felino.jpg', 'Estetica', 65000),
('Vacunacion', 'Aplicacion de vacunas para mascotas', 'img/vacunacion.jpg', 'Salud', 80000),
('Consulta Veterinaria', 'Chequeo medico general para mascotas', 'img/consulta.jpg', 'Salud', 120000),
('Spa Mascotas', 'Servicio premium de relajacion y limpieza', 'img/spa.jpg', 'Spa', 150000);

-- =========================
-- REGISTROS TABLA EMPLEADOS
-- =========================
INSERT INTO empleados(especialidad, url_img, id_usuario) VALUES
('Veterinario General', 'img/empleado1.jpg', 3),
('Peluqueria Canina', 'img/empleado2.jpg', 4),
('Vacunacion Animal', 'img/empleado3.jpg', 3),
('Spa Animal', 'img/empleado4.jpg', 4),
('Consulta Especializada', 'img/empleado5.jpg', 3);

-- =========================
-- REGISTROS TABLA HORARIOS
-- =========================
INSERT INTO horarios(fecha, hora, id_empleado) VALUES
('2026-05-15', '08:00:00', 1),
('2026-05-15', '10:00:00', 2),
('2026-05-16', '09:30:00', 3),
('2026-05-16', '14:00:00', 4),
('2026-05-17', '16:00:00', 5);

-- =========================
-- REGISTROS TABLA RESERVAS
-- =========================
INSERT INTO reservas(fecha, hora, estado, id_usuarios, id_empleado, id_servicio) VALUES
('2026-05-15', '08:00:00', 'Pendiente', 1, 1, 1),
('2026-05-15', '10:00:00', 'Confirmada', 2, 2, 2),
('2026-05-16', '09:30:00', 'Completada', 1, 3, 3),
('2026-05-16', '14:00:00', 'Pendiente', 2, 4, 4),
('2026-05-17', '16:00:00', 'Cancelada', 1, 5, 5);