# A05 - Redis, caché y expiración

## 1. Objetivo

A05 tiene como objetivo incorporar Redis como mecanismo de caché
para reducir consultas repetidas sobre información de alta lectura.

Redis no reemplaza a SQL Server.

La persistencia principal continúa siendo SQL Server.

Redis se utiliza solamente como almacenamiento temporal.

## 2. Arquitectura prevista

La arquitectura propuesta es:

Frontend
↓
FastAPI
↓
Redis
↓
SQL Server / fuente externa

El cliente continúa consumiendo los mismos endpoints REST.

Redis debe ser transparente para el frontend.

## 3. Patrón utilizado

Se propone utilizar el patrón:

Cache Aside

Flujo:

1. El frontend realiza una petición.
2. FastAPI consulta Redis.
3. Si el dato existe, se devuelve desde caché.
4. Si el dato no existe, se consulta SQL Server.
5. FastAPI guarda el resultado en Redis.
6. Se asigna un TTL.
7. Se devuelve la respuesta al frontend.

## 4. CACHE HIT

Un CACHE HIT ocurre cuando la información solicitada ya existe
en Redis.

Ejemplo:

GET /api/v1/hoteles/

Redis:

hoteles:list:v1

Si la clave existe:

Redis
↓
FastAPI
↓
Frontend

En este caso no es necesario consultar SQL Server.

## 5. CACHE MISS

Un CACHE MISS ocurre cuando la información solicitada
no existe en Redis.

Flujo:

GET /api/v1/hoteles/
↓
Redis
↓
MISS
↓
SQL Server
↓
Redis SET
↓
Frontend

## 6. Claves previstas

### Listado de hoteles

`hoteles:list:v1`

### Hotel individual

`hotel:{id}:v1`

Ejemplo:

`hotel:3:v1`

### Actividades

`actividades:list:v1`

### Precio externo

Ejemplo básico:

`hotel:3:precio:v1`

Si el precio depende de parámetros como fechas y cantidad
de personas, la clave deberá incluirlos.

Ejemplo:

`hotel:3:precio:2026-10-10:2026-10-12:2:1`

## 7. TTL

TTL significa:

Time To Live

Representa cuánto tiempo permanecerá un dato almacenado
en Redis antes de expirar automáticamente.

Ejemplos previstos:

Hoteles:

300 segundos

Precios externos:

1800 segundos

Actividades:

1800 segundos

Los valores deben configurarse mediante variables de entorno.

Ejemplo:

```env
REDIS_TTL_HOTELES=300
REDIS_TTL_PRECIOS=1800
REDIS_TTL_ACTIVIDADES=1800