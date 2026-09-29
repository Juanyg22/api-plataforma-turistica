# A02 - Consumo de API REST

## 1. Objetivo

El objetivo de A02 es implementar desde el frontend el consumo
de la API REST del sistema PosadasTurismo.

La comunicación se realiza mediante HTTP utilizando `fetch()`
y funciones asíncronas con `async/await`.

El frontend no accede directamente a SQL Server.

La arquitectura esperada es:

Frontend
↓
API REST - FastAPI
↓
SQL Server


## 2. Endpoints utilizados

### Listado de hoteles

Método:

GET

Endpoint:

/api/v1/hoteles/

Objetivo:

Obtener la colección de hoteles registrados en el sistema.

Ejemplo conceptual de respuesta:

```json
[
  {
    "id": 1,
    "nombre": "Hotel Ejemplo",
    "zona_id": 1,
    "precio_base": 85000,
    "descripcion": "Descripción del alojamiento",
    "direccion": "Posadas, Misiones",
    "categoria": 4,
    "calificacion": 8.7,
    "servicio": "WiFi, Piscina"
  }
]

