# A06 - Manejo de errores, fuente y fecha de actualización

## 1. Objetivo

A06 tiene como objetivo evitar que una falla de comunicación
produzca una interfaz bloqueada o un comportamiento no controlado.

Además, la interfaz debe proporcionar información sobre el origen
de determinados datos y su última actualización.

## 2. Principio utilizado

Las comunicaciones externas pueden fallar.

Por ese motivo el frontend no supone que cada petición HTTP
finalizará correctamente.

Cada operación contempla distintos estados:

1. Cargando.
2. Éxito.
3. Sin resultados.
4. Error.
5. Reintento.

## 3. Estado de carga

Mientras una petición HTTP se encuentra en proceso se presenta
un indicador visual.

Esto permite informar al usuario que la aplicación continúa
trabajando y evita interpretar la ausencia temporal de datos
como un error.

Flujo:

Petición iniciada
↓
Spinner
↓
Respuesta
↓
Resultado o error

## 4. Error de conexión

Puede ocurrir cuando:

- FastAPI no se encuentra iniciado;
- el servidor no responde;
- existe un problema de red;
- la dirección del servicio es incorrecta.

El frontend captura el error y presenta un mensaje controlado.

No se deja una excepción de JavaScript sin tratamiento.

## 5. Timeout

Las solicitudes poseen un tiempo máximo de espera.

Actualmente el frontend contempla aproximadamente:

8000 ms

equivalentes a:

8 segundos.

Para controlar este comportamiento se utiliza:

AbortController

Si se supera el tiempo máximo, la petición se cancela y
el usuario recibe un mensaje de error.

## 6. Errores HTTP

El frontend verifica la propiedad:

response.ok

Una respuesta HTTP recibida correctamente no significa
necesariamente que la operación haya sido exitosa.

Ejemplos:

### HTTP 400

Solicitud inválida.

### HTTP 404

Recurso no encontrado.

Ejemplo:

GET /api/v1/hoteles/9999

si el hotel no existe.

### HTTP 500

Error interno del servidor.

El frontend debe informar el problema sin bloquear
la navegación general.

## 7. Respuesta vacía

Una respuesta válida puede contener una colección vacía.

Ejemplo:

```json
[]