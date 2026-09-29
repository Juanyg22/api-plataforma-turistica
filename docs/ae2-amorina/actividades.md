# A04 - Integración de actividades turísticas

## 1. Objetivo

A04 tiene como objetivo integrar información de actividades
turísticas dentro de PosadasTurismo.

La interfaz debe poder recibir información desde un servicio
o proveedor externo y representarla dinámicamente.

## 2. Arquitectura prevista

La arquitectura final es:

Proveedor de actividades
↓
Backend FastAPI
↓
API REST propia
↓
Frontend
↓
Vista Explorar

El frontend no necesita conocer cómo obtiene FastAPI
la información original.

## 3. Endpoint previsto

El contrato previsto es:

GET /api/v1/actividades/

Su objetivo será obtener la colección de actividades
turísticas disponibles.

## 4. Estado actual

El backend utilizado como referencia todavía no dispone
del endpoint de actividades.

Por ese motivo se implementó un modo demostración mediante:

frontend/data/actividades_mock.json

## 5. Modo demostración

La vista puede ejecutarse mediante:

actividades.html?demoA04=1

En este modo JavaScript obtiene los datos desde:

frontend/data/actividades_mock.json

## 6. Estructura de una actividad

Ejemplo conceptual:

```json
{
  "id": 102,
  "external_id": "ACT-DEMO-1002",
  "nombre": "Experiencia náutica sobre el Paraná",
  "tipo": "Navegación",
  "descripcion": "Actividad turística de demostración.",
  "precio": 18000,
  "moneda": "ARS",
  "ubicacion": "Río Paraná - Posadas",
  "proveedor": "Prestador turístico externo (simulado)",
  "fecha_actualizacion": "2026-09-28T18:25:00",
  "datos_simulados": true
}