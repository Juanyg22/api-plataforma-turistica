# API - Plataforma Turística Inteligente (AE1)

## Descripción
API RESTful para la gestión turística de Posadas, Misiones, desarrollada como primer incremento (AE1). Esta versión implementa el CRUD de la entidad principal `Hotel` utilizando una arquitectura en capas.

## Tecnologías Utilizadas
* Python 3
* FastAPI
* SQL Server (Persistencia)
* SQLAlchemy y PyODBC

## Instalación y Configuración
1. Clonar el repositorio.
2. Crear y activar un entorno virtual (`python -m venv venv`).
3. Instalar las dependencias: `pip install -r requirements.txt`.
4. Configurar las variables de entorno basándose en el archivo `.env.example`.
5. Ejecutar el servidor: `python main.py`.

## Endpoints Principales
* `GET /api/v1/hoteles/` - Listar todos los alojamientos.
* `POST /api/v1/hoteles/` - Registrar un nuevo hotel.
* `GET /api/v1/hoteles/{id}` - Obtener detalles de un hotel.
* `DELETE /api/v1/hoteles/{id}` - Eliminar un hotel.
