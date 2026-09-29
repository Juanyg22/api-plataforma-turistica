# Alcance individual de AE2

## 1. Escenario

Se trabaja sobre PosadasTurismo, una plataforma web destinada
a centralizar información de alojamientos, actividades y ofertas
turísticas de la ciudad de Posadas.

La solución evoluciona el trabajo desarrollado previamente en AE1.

## 2. Versión de AE1 utilizada como punto de partida

Commit base:

`f3f61cc - Create README for API documentation`

A partir de este estado se creó el branch individual:

`ae2/amorina-figueroa`

## 3. Módulos seleccionados

El alcance individual se centra principalmente en:

- interfaz web pública;
- consumo de servicios REST;
- integración de información externa;
- actividades turísticas;
- tratamiento de estados de carga y error;
- preparación del frontend para información proveniente de caché.

## 4. Requerimientos funcionales

### A01 - Frontend responsive de hoteles

Desarrollo de las interfaces para catálogo, autenticación,
registro, detalle de hotel, actividades y ofertas.

### A02 - Consumo de API REST

Consumo asíncrono de información de hoteles mediante HTTP
y JSON.

### A03 - Precio y promociones desde fuentes externas

Preparación de la interfaz para mostrar precio base,
precio promocional, descuento, proveedor y fecha de actualización.

### A04 - Integración de actividades

Carga dinámica de actividades turísticas desde un servicio
o proveedor externo.

### A05 - Redis, caché y expiración

El frontend queda preparado para recibir metadatos de caché.
La implementación de Redis corresponde al backend.

### A06 - Manejo de errores, fuente y actualización

Tratamiento visual de errores, timeout, estados vacíos,
reintentos y presentación de la fuente y fecha de actualización.

## 5. Dependencias

El frontend depende de:

- API REST desarrollada con FastAPI;
- SQL Server para la persistencia principal;
- Redis para caché cuando sea integrado;
- proveedores externos reales o simulados para precios y actividades.

## 6. Estado heredado de AE1

La solución base disponía de un backend FastAPI con operaciones
sobre hoteles y persistencia mediante SQL Server.

La interfaz y las integraciones correspondientes al alcance
individual de AE2 se evolucionan sobre esa base.

## 7. Fuera del alcance individual

No forman parte de la implementación individual directa:

- administración interna de SQL Server;
- implementación del servidor Redis;
- implementación de RabbitMQ;
- pasarela de pagos real;
- scraping productivo de sitios comerciales;
- credenciales de APIs comerciales.

Estas funciones pertenecen a otros componentes del sistema
o serán integradas posteriormente.