# Pruebas AE2

## A02 - Consumo de API REST

### P-A02-01 - Estado de carga

**Objetivo:** verificar que la interfaz informe que existe
una solicitud en progreso.

**Pasos:**

1. Abrir `index.html`.
2. Permitir que JavaScript intente conectarse con FastAPI.

**Resultado esperado:**

- aparece el spinner;
- aparece el mensaje de carga;
- la interfaz no queda visualmente bloqueada.

**Resultado:** OK.


### P-A02-02 - API no disponible

**Objetivo:** comprobar el comportamiento cuando FastAPI
no está iniciado.

**Pasos:**

1. Mantener FastAPI detenido.
2. Abrir el catálogo.
3. Esperar el resultado de la solicitud.

**Resultado esperado:**

- se intenta realizar la petición;
- el spinner desaparece;
- aparece un mensaje de error controlado;
- se muestra la opción de reintentar.

**Resultado:** OK.


### P-A02-03 - Timeout

**Objetivo:** evitar una espera indefinida.

**Resultado esperado:**

Después del tiempo máximo configurado, la solicitud se cancela
y la interfaz informa que el servidor tardó demasiado
en responder.

**Resultado:** Implementado.


### P-A02-04 - Reintento

**Objetivo:** permitir repetir una solicitud fallida.

**Pasos:**

1. Provocar un error de conexión.
2. Esperar la aparición del mensaje.
3. Presionar `Reintentar`.

**Resultado esperado:**

Se ejecuta nuevamente la solicitud HTTP.

**Resultado:** OK.


### P-A02-05 - Respuesta exitosa

**Objetivo:** verificar el renderizado de hoteles obtenidos
desde FastAPI.

**Estado actual:**

Pendiente de validación extremo a extremo.

**Motivo:**

El backend requiere una instancia SQL Server que actualmente
es administrada por otro integrante del equipo.


### P-A02-06 - Hotel individual

**Objetivo:** comprobar:

GET /api/v1/hoteles/{id}

**Estado actual:**

La lógica frontend se encuentra implementada.

La prueba con datos reales queda pendiente hasta disponer
del backend y SQL Server operativos.