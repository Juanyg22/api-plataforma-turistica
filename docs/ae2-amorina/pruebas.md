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

---

# A03 - Precios y promociones externas

## P-A03-01 - Carga del proveedor simulado

**Objetivo:** verificar la lectura de información externa simulada.

**Pasos:**

1. Iniciar el frontend mediante Live Server.
2. Abrir:

`index.html?demoA03=1`

**Resultado esperado:**

- se carga `booking_mock.json`;
- los hoteles muestran datos externos;
- no se necesita FastAPI.

**Resultado:** OK.


## P-A03-02 - Precio promocional

**Objetivo:** comprobar que un hotel pueda mostrar precio
base y precio promocional.

**Resultado esperado:**

- precio anterior visible;
- precio actual visible;
- descuento visible;
- promoción visible.

**Resultado:** OK.


## P-A03-03 - Fuente y actualización

**Objetivo:** verificar la trazabilidad del dato externo.

**Resultado esperado:**

La interfaz muestra:

- proveedor;
- fecha de actualización.

**Resultado:** OK.


## P-A03-04 - Hotel sin promoción

**Objetivo:** comprobar el comportamiento cuando no existe
una promoción.

**Resultado esperado:**

La interfaz muestra el precio disponible sin inventar
un descuento.

**Resultado:** OK.


## P-A03-05 - Sustitución futura

**Objetivo:** comprobar que la interfaz no depende de valores
escritos manualmente dentro del HTML.

**Resultado esperado:**

Los datos son obtenidos desde una estructura externa y
procesados dinámicamente por JavaScript.

**Resultado:** OK.

---

# A04 - Integración de actividades

## P-A04-01 - Carga del modo demostración

**Objetivo:** verificar la carga dinámica de actividades.

**Pasos:**

1. Iniciar Live Server.
2. Abrir:

`actividades.html?demoA04=1`

**Resultado esperado:**

- se carga `actividades_mock.json`;
- se generan las tarjetas;
- no es necesario tener FastAPI operativo.

**Resultado:** OK.


## P-A04-02 - Renderizado dinámico

**Objetivo:** comprobar que las actividades no estén
codificadas individualmente en el HTML.

**Resultado esperado:**

JavaScript genera las tarjetas utilizando los datos
recibidos desde el JSON.

**Resultado:** OK.


## P-A04-03 - Información de fuente

**Objetivo:** verificar la trazabilidad de la actividad.

**Resultado esperado:**

Cada actividad puede mostrar:

- proveedor;
- external_id;
- fecha de actualización.

**Resultado:** OK.


## P-A04-04 - Estado sin resultados

**Objetivo:** verificar el comportamiento ante una colección vacía.

**Resultado esperado:**

La interfaz informa que no existen actividades disponibles.

**Resultado:** Implementado.


## P-A04-05 - Error de carga

**Objetivo:** verificar el comportamiento si no pueden
obtenerse las actividades.

**Resultado esperado:**

- desaparece el spinner;
- aparece un mensaje de error;
- aparece la opción Reintentar.

**Resultado:** Implementado.


## P-A04-06 - Endpoint real

**Objetivo:** comprobar:

GET /api/v1/actividades/

**Estado actual:**

Pendiente de integración.

**Motivo:**

El endpoint todavía no se encuentra disponible en el backend
utilizado como referencia.

---

# A05 - Redis, caché y expiración

## P-A05-01 - CACHE MISS

**Objetivo:** verificar el comportamiento cuando la clave
no existe en Redis.

**Procedimiento previsto:**

1. Eliminar la clave correspondiente.
2. Ejecutar:

`GET /api/v1/hoteles/`

3. Verificar los logs del backend.

**Resultado esperado:**

- CACHE MISS;
- consulta a SQL Server;
- almacenamiento en Redis;
- asignación de TTL.

**Estado actual:** Pendiente de backend.


## P-A05-02 - CACHE HIT

**Objetivo:** verificar que una segunda consulta utilice Redis.

**Procedimiento previsto:**

1. Ejecutar una primera petición.
2. Ejecutar nuevamente:

`GET /api/v1/hoteles/`

antes de que expire la clave.

**Resultado esperado:**

- CACHE HIT;
- respuesta obtenida desde Redis;
- no se realiza nuevamente la misma consulta a SQL Server.

**Estado actual:** Pendiente de backend.


## P-A05-03 - TTL

**Objetivo:** verificar la expiración automática.

**Procedimiento previsto:**

1. Configurar un TTL reducido para demostración.
2. Realizar una petición.
3. Consultar el TTL restante.
4. Esperar la expiración.
5. Repetir la petición.

**Resultado esperado:**

Después de expirar la clave, la nueva petición produce
CACHE MISS.

**Estado actual:** Pendiente de backend.


## P-A05-04 - Invalidación

**Objetivo:** evitar datos obsoletos después de modificar
información persistente.

**Procedimiento previsto:**

1. Cargar la lista de hoteles en Redis.
2. Crear o modificar un hotel.
3. Verificar que se elimine la clave correspondiente.
4. Solicitar nuevamente el listado.

**Resultado esperado:**

La nueva solicitud obtiene información actualizada.

**Estado actual:** Pendiente de backend.


## P-A05-05 - Redis no disponible

**Objetivo:** comprobar que Redis no sea un punto único
de fallo.

**Procedimiento previsto:**

1. Detener Redis.
2. Mantener FastAPI y SQL Server activos.
3. Ejecutar:

`GET /api/v1/hoteles/`

**Resultado esperado:**

- FastAPI registra un error o bypass de caché;
- consulta SQL Server;
- devuelve HTTP 200 si la base de datos está disponible.

**Estado actual:** Pendiente de backend.


## P-A05-06 - Metadatos de caché en frontend

**Objetivo:** comprobar que el frontend pueda interpretar
información de caché cuando FastAPI la proporcione.

Headers previstos:

- X-Cache
- X-Cache-TTL
- X-Data-Source
- X-Last-Updated

**Resultado esperado:**

La incorporación de Redis no requiere modificar
la estructura JSON de hoteles.

**Estado actual:** Frontend preparado.