# A03 - Integración de precios y promociones externas

## 1. Objetivo

A03 tiene como objetivo preparar PosadasTurismo para recibir
información de precios y promociones desde fuentes externas.

La información externa se presenta dentro del catálogo y
la vista detallada de cada alojamiento.

## 2. Arquitectura prevista

La arquitectura final prevista es:

Proveedor externo
↓
Backend FastAPI
↓
SQL Server / Redis
↓
API REST propia
↓
Frontend

El frontend no debe consultar directamente una plataforma
comercial.

## 3. Alternativas analizadas

### Alternativa 1 - Web scraping individual

Consistía en consultar el sitio oficial de cada hotel mediante
herramientas como BeautifulSoup o Selenium.

Ventajas:

- permite consultar directamente la fuente oficial;
- no requiere una API comercial.

Desventajas:

- cada sitio web tiene una estructura diferente;
- los selectores pueden cambiar;
- algunos sitios generan precios mediante JavaScript;
- requiere mantener un scraper distinto para varios hoteles.

### Alternativa 2 - Proveedor agregador

Se analizó utilizar una API agregadora como Booking Demand API.

Ventajas:

- contrato uniforme;
- permite trabajar con varios hoteles;
- centraliza precios y disponibilidad;
- simplifica la incorporación de nuevos alojamientos.

Desventajas:

- requiere credenciales comerciales;
- requiere API Key y credenciales de afiliado;
- no se dispone de dichas credenciales para el prototipo.

## 4. Decisión adoptada

Para el prototipo se adoptó una simulación de proveedor
agregador mediante un archivo JSON.

Archivo:

`frontend/data/booking_mock.json`

Esta alternativa permite probar la arquitectura del frontend
sin afirmar que existe una conexión real con Booking.com.

## 5. Estructura del proveedor simulado

Ejemplo conceptual:

```json
{
  "hotel_id": 1,
  "external_id": "BK-DEMO-10001",
  "proveedor": "Booking.com",
  "datos_simulados": true,
  "precio_base": 85000,
  "precio_actual": 79000,
  "precio_anterior": 85000,
  "moneda": "ARS",
  "descuento_porcentaje": 7,
  "promocion_titulo": "Tarifa promocional simulada",
  "fecha_actualizacion": "2026-09-28T18:00:00"
}