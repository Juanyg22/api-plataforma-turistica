const API_URL_HOTELES = "http://localhost:8000/api/v1/hoteles/";
const API_URL_ACTIVIDADES = "http://localhost:8000/api/v1/actividades/";
const API_TIMEOUT_MS = 8000;
const A03_DEMO_MODE = new URLSearchParams(window.location.search).get("demoA03") === "1";
const A03_DEMO_PRICES_URL = "data/booking_mock.json";
const A04_DEMO_MODE = new URLSearchParams(window.location.search).get("demoA04") === "1";
const A04_DEMO_ACTIVITIES_URL = "data/actividades_mock.json";
const AUTH_USERS_KEY = "posadasTurismoUsuariosDemo";
const AUTH_SESSION_KEY = "posadasTurismoSesionDemo";
const SEARCH_STATE_KEY = "posadasTurismoBusquedaDemo";
const PENDING_BOOKING_KEY = "posadasTurismoReservaPendiente";
const RESERVATIONS_KEY = "posadasTurismoReservasDemo";

const MOCK_HOTELES = [
    {
        id: 1,
        nombre: "Hotel Maitei Posadas",
        categoria: "4 Estrellas",
        ubicacion: "Cerca del Aeropuerto y Centro de Convenciones",
        precio_noche: 85000,
        servicios: ["Piscina", "WiFi Gratis", "Spa", "Restaurante"],
        imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 2,
        nombre: "Urbano Posadas Hotel",
        categoria: "4 Estrellas",
        ubicacion: "Microcentro - Plaza 9 de Julio",
        precio_noche: 72000,
        servicios: ["Gimnasio", "Desayuno Buffet", "Estacionamiento"],
        imagen: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 3,
        nombre: "Posadas Hotel & Suites",
        categoria: "3 Estrellas",
        ubicacion: "Costanera Sur",
        precio_noche: 54000,
        servicios: ["Vista al Río", "WiFi", "Bar"],
        imagen: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80"
    }
];

const DETALLES_HOTELES = {
    1: {
        descripcion: "Alojamiento de perfil confortable, pensado para quienes buscan combinar descanso, servicios y una ubicación práctica para moverse por Posadas. La ficha de esta demostración reúne la información principal antes de iniciar una reserva.",
        zona: "Entorno próximo al acceso al aeropuerto y al Centro de Convenciones, con conexión hacia distintas zonas de la ciudad.",
        seguridad: "Información orientativa del prototipo: se recomienda coordinar traslados nocturnos, utilizar transporte habilitado y consultar indicaciones actualizadas del alojamiento o canales oficiales.",
        movilidad: "Acceso principalmente por vehículo, taxi o remis. Para recorridos turísticos conviene planificar los traslados con anticipación.",
        entorno: "Sector de acceso urbano con servicios distribuidos y buena conexión hacia avenidas principales.",
        politica: "Check-in desde las 14:00 · Check-out hasta las 11:00",
        galeria: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80"
        ]
    },
    2: {
        descripcion: "Propuesta urbana para visitantes que priorizan cercanía con el centro, comercios y puntos de interés. El objetivo de esta vista es mostrar de forma clara ubicación, servicios y condiciones antes de avanzar al checkout simulado.",
        zona: "Ubicación céntrica, próxima a Plaza 9 de Julio y a sectores comerciales y administrativos del microcentro.",
        seguridad: "Información orientativa del prototipo: al tratarse de una zona céntrica conviene aplicar las precauciones habituales de una ciudad y verificar recomendaciones locales actualizadas.",
        movilidad: "Buena disponibilidad de recorridos urbanos, taxis y remises; varios puntos céntricos pueden recorrerse a pie.",
        entorno: "Área con actividad comercial, gastronómica y administrativa durante gran parte del día.",
        politica: "Check-in desde las 14:00 · Check-out hasta las 10:30",
        galeria: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80"
        ]
    },
    3: {
        descripcion: "Alojamiento orientado a una estadía práctica cerca del frente costero, con servicios esenciales y una experiencia pensada para quienes desean combinar descanso con paseos por la ciudad.",
        zona: "Sector cercano a la Costanera Sur, con acceso a espacios de paseo y conexión hacia el centro de Posadas.",
        seguridad: "Información orientativa del prototipo: para recorridos nocturnos se recomienda permanecer en sectores transitados y consultar referencias actualizadas del alojamiento y organismos locales.",
        movilidad: "Acceso mediante transporte urbano, taxi, remis o vehículo particular; la Costanera permite realizar parte de los recorridos a pie.",
        entorno: "Zona vinculada al paseo costero, espacios recreativos y circulación turística.",
        politica: "Check-in desde las 13:00 · Check-out hasta las 10:00",
        galeria: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=900&q=80"
        ]
    }
};

const MOCK_ACTIVIDADES = [
    {
        id: 101,
        nombre: "Paseo por la Costanera",
        tipo: "Paseo urbano",
        descripcion: "Un recorrido ideal para disfrutar la vista al río Paraná, caminar y conocer uno de los espacios más representativos de Posadas.",
        precio: 0,
        imagen: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        fuente: "Agenda turística local"
    },
    {
        id: 102,
        nombre: "Experiencia náutica sobre el Paraná",
        tipo: "Navegación",
        descripcion: "Propuesta recreativa para observar la ciudad desde el río y complementar la visita con una experiencia diferente.",
        precio: 18000,
        imagen: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
        fuente: "Prestadores turísticos"
    },
    {
        id: 103,
        nombre: "Recorrido cultural por el centro",
        tipo: "Cultura e historia",
        descripcion: "Paseo por espacios históricos, plazas y puntos de interés del microcentro de la ciudad.",
        precio: 0,
        imagen: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
        fuente: "Agenda turística local"
    }
];

const MOCK_OFERTAS = [
    {
        id: 201,
        titulo: "Escapada de fin de semana",
        hotel: "Hotel Maitei Posadas",
        descripcion: "Beneficio especial para estadías de dos noches durante fines de semana seleccionados.",
        descuento: "20% OFF",
        precio: 68000,
        precio_anterior: 85000,
        fuente: "Booking.com (proveedor de referencia)",
        fecha_actualizacion: "2026-09-28T18:00:00",
        imagen: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 202,
        titulo: "Promo Costanera",
        hotel: "Posadas Hotel & Suites",
        descripcion: "Tarifa promocional para reservas anticipadas en habitaciones seleccionadas.",
        descuento: "15% OFF",
        precio: 45900,
        precio_anterior: 54000,
        fuente: "Booking.com (proveedor de referencia)",
        fecha_actualizacion: "2026-09-28T18:05:00",
        imagen: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 203,
        titulo: "Estadía urbana",
        hotel: "Urbano Posadas Hotel",
        descripcion: "Promoción para visitantes que buscan alojarse cerca del microcentro y principales servicios.",
        descuento: "Tarifa especial",
        precio: 62000,
        precio_anterior: 72000,
        fuente: "Booking.com (proveedor de referencia)",
        fecha_actualizacion: "2026-09-28T18:10:00",
        imagen: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    actualizarNavegacionSesion();
    inicializarAutenticacion();

    if (document.getElementById("listado")) {
        inicializarConsumoAPIHoteles();
        inicializarInteraccionTarjetas();
        inicializarBuscador();
    }

    if (document.getElementById("listado-actividades")) inicializarIntegracionActividades();
    if (document.getElementById("listado-ofertas")) renderizarOfertas();
    if (document.getElementById("hotel-detalle-page")) inicializarDetalleHotel();
});

// =========================
// AUTENTICACIÓN DEMOSTRATIVA
// =========================
function obtenerUsuariosDemo() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_USERS_KEY)) || [];
    } catch {
        return [];
    }
}

function obtenerSesion() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY));
    } catch {
        return null;
    }
}

function guardarSesion(usuario) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
    }));
}

function cerrarSesion() {
    localStorage.removeItem(AUTH_SESSION_KEY);
    window.location.href = "index.html";
}

async function hashPassword(password) {
    if (window.crypto?.subtle) {
        const data = new TextEncoder().encode(password);
        const digest = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(digest))
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");
    }
    return `demo-${btoa(unescape(encodeURIComponent(password)))}`;
}

function obtenerDestinoSeguro() {
    const params = new URLSearchParams(window.location.search);
    const destino = params.get("return");
    if (!destino || destino.includes("://") || destino.startsWith("//")) return "index.html";
    return destino;
}

function actualizarNavegacionSesion() {
    const sesion = obtenerSesion();
    const links = document.querySelectorAll(".btn-nav-action");

    links.forEach(link => {
        if (!sesion) return;

        const saludo = document.createElement("span");
        saludo.className = "nav-user-name";
        saludo.textContent = `Hola, ${sesion.nombre.split(" ")[0]}`;
        link.parentNode?.insertBefore(saludo, link);

        link.textContent = "Cerrar sesión";
        link.href = "#";
        link.addEventListener("click", event => {
            event.preventDefault();
            cerrarSesion();
        });
    });
}

function mostrarMensajeAuth(elemento, texto, tipo = "error") {
    if (!elemento) return;
    elemento.className = `auth-message ${tipo}`;
    elemento.textContent = texto;
}

function inicializarAutenticacion() {
    const formLogin = document.getElementById("form-login-page");
    const formRegistro = document.getElementById("form-registro-usuario");
    const sesion = obtenerSesion();

    if (formLogin) {
        const mensaje = document.getElementById("auth-message-login");
        const linkRegistro = document.getElementById("link-crear-cuenta");
        const destino = obtenerDestinoSeguro();

        if (linkRegistro) {
            linkRegistro.href = `registro-usuario.html?return=${encodeURIComponent(destino)}`;
        }

        if (sesion) {
            mostrarMensajeAuth(mensaje, `Ya hay una sesión iniciada como ${sesion.email}.`, "ok");
        }

        formLogin.addEventListener("submit", async event => {
            event.preventDefault();
            const email = document.getElementById("login-email").value.trim().toLowerCase();
            const password = document.getElementById("login-password").value;
            const hash = await hashPassword(password);
            const usuario = obtenerUsuariosDemo().find(item => item.email === email && item.passwordHash === hash);

            if (!usuario) {
                mostrarMensajeAuth(mensaje, "Correo o contraseña incorrectos. Si todavía no tenés cuenta, creala primero.");
                return;
            }

            guardarSesion(usuario);
            mostrarMensajeAuth(mensaje, "Sesión iniciada correctamente. Redirigiendo...", "ok");
            setTimeout(() => {
                window.location.href = destino;
            }, 450);
        });
    }

    if (formRegistro) {
        const mensaje = document.getElementById("auth-message-register");
        const linkLogin = document.getElementById("link-ir-login");
        const destino = obtenerDestinoSeguro();

        if (linkLogin) {
            linkLogin.href = `login.html?return=${encodeURIComponent(destino)}`;
        }

        formRegistro.addEventListener("submit", async event => {
            event.preventDefault();

            const nombre = document.getElementById("registro-nombre").value.trim();
            const email = document.getElementById("registro-email").value.trim().toLowerCase();
            const password = document.getElementById("registro-password").value;
            const confirmacion = document.getElementById("registro-password-confirm").value;

            if (password.length < 6) {
                mostrarMensajeAuth(mensaje, "La contraseña debe tener al menos 6 caracteres.");
                return;
            }

            if (password !== confirmacion) {
                mostrarMensajeAuth(mensaje, "Las contraseñas no coinciden.");
                return;
            }

            const usuarios = obtenerUsuariosDemo();
            if (usuarios.some(item => item.email === email)) {
                mostrarMensajeAuth(mensaje, "Ya existe una cuenta con ese correo electrónico.");
                return;
            }

            const nuevoUsuario = {
                id: Date.now(),
                nombre,
                email,
                passwordHash: await hashPassword(password)
            };

            usuarios.push(nuevoUsuario);
            localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(usuarios));
            guardarSesion(nuevoUsuario);

            mostrarMensajeAuth(mensaje, "Cuenta creada. Ya podés continuar con tu reserva.", "ok");
            setTimeout(() => {
                window.location.href = destino;
            }, 550);
        });
    }
}

// =========================
// HOME / LISTADO
// =========================
function inicializarBuscador() {
    const formBusqueda = document.getElementById("form-busqueda");
    if (!formBusqueda) return;

    const estadoPrevio = leerJSON(sessionStorage.getItem(SEARCH_STATE_KEY));
    if (estadoPrevio) {
        if (estadoPrevio.checkin) document.getElementById("checkin").value = estadoPrevio.checkin;
        if (estadoPrevio.checkout) document.getElementById("checkout").value = estadoPrevio.checkout;
        if (estadoPrevio.adultos) document.getElementById("huespedes").value = String(estadoPrevio.adultos);
        if (estadoPrevio.ubicacion) document.getElementById("ubicacion").value = estadoPrevio.ubicacion;
    }

    const hoy = fechaISO(new Date());
    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    checkin.min = hoy;
    checkout.min = hoy;

    checkin.addEventListener("change", () => {
        if (checkin.value) checkout.min = checkin.value;
    });

    formBusqueda.addEventListener("submit", event => {
        event.preventDefault();
        guardarEstadoBusqueda();
        document.getElementById("listado")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

function guardarEstadoBusqueda() {
    const estado = {
        ubicacion: document.getElementById("ubicacion")?.value.trim() || "",
        checkin: document.getElementById("checkin")?.value || "",
        checkout: document.getElementById("checkout")?.value || "",
        adultos: Number(document.getElementById("huespedes")?.value || 2)
    };
    sessionStorage.setItem(SEARCH_STATE_KEY, JSON.stringify(estado));
    return estado;
}

let cargandoHoteles = false;

function inicializarConsumoAPIHoteles() {
    const btnReintentar = document.getElementById("btn-reintentar-hoteles");
    const cargar = A03_DEMO_MODE ? obtenerHotelesDemoA03 : obtenerHoteles;

    if (btnReintentar) {
        btnReintentar.addEventListener("click", () => cargar());
    }

    cargar();
}

async function obtenerHotelesDemoA03() {
    if (cargandoHoteles) return;

    const container = document.getElementById("listado");
    if (!container) return;

    cargandoHoteles = true;
    container.innerHTML = "";
    mostrarEstadoHoteles("loading");

    try {
        const resultado = await solicitarJSON(A03_DEMO_PRICES_URL, {}, 3000);
        const preciosExternos = Array.isArray(resultado.data) ? resultado.data : [];
        const hoteles = enriquecerHotelesConPreciosExternos(MOCK_HOTELES, preciosExternos);

        renderizarHoteles(hoteles, container);
        mostrarEstadoHoteles("success", {
            status: 200,
            cantidad: hoteles.length,
            mensaje: `Modo demostración A03 · ${hoteles.length} tarifas simuladas · proveedor de referencia: Booking.com`
        });
    } catch (error) {
        console.error("Error al cargar la demostración A03:", error);
        mostrarEstadoHoteles("error", {
            titulo: "No se pudo cargar la demostración A03",
            mensaje: "Verificá que data/booking_mock.json exista y que el proyecto se abra con Live Server."
        });
    } finally {
        cargandoHoteles = false;
    }
}

function enriquecerHotelesConPreciosExternos(hoteles, preciosExternos) {
    return hoteles.map(hotel => {
        const externo = preciosExternos.find(item => Number(item.hotel_id) === Number(hotel.id));
        return externo ? { ...hotel, ...externo } : hotel;
    });
}

async function obtenerHoteles() {
    if (cargandoHoteles) return;

    const container = document.getElementById("listado");
    if (!container) return;

    cargandoHoteles = true;
    container.innerHTML = "";
    mostrarEstadoHoteles("loading");

    try {
        const resultado = await solicitarJSON(API_URL_HOTELES);
        const datos = resultado.data;

        if (!Array.isArray(datos)) {
            throw new APIRequestError(
                "La API respondió con un formato inesperado.",
                resultado.status,
                "INVALID_RESPONSE"
            );
        }

        if (datos.length === 0) {
            mostrarEstadoHoteles("empty");
            return;
        }

        renderizarHoteles(datos, container);
        mostrarEstadoHoteles("success", {
            status: resultado.status,
            cantidad: datos.length,
            meta: resultado.meta
        });
    } catch (error) {
        console.error("Error al consumir GET /api/v1/hoteles/:", error);
        mostrarEstadoHoteles("error", obtenerMensajeAPI(error, "lista"));
    } finally {
        cargandoHoteles = false;
    }
}

function mostrarEstadoHoteles(estado, datos = {}) {
    const loading = document.getElementById("loading-spinner");
    const error = document.getElementById("error-banner");
    const empty = document.getElementById("empty-banner");
    const success = document.getElementById("api-success-hoteles");

    [loading, error, empty, success].forEach(elemento => elemento?.classList.add("hidden"));

    if (estado === "loading") {
        loading?.classList.remove("hidden");
        return;
    }

    if (estado === "error") {
        setTexto("api-error-title", datos.titulo || "No se pudieron cargar los alojamientos");
        setTexto("api-error-message", datos.mensaje || "No fue posible completar la petición a la API.");
        error?.classList.remove("hidden");
        return;
    }

    if (estado === "empty") {
        empty?.classList.remove("hidden");
        return;
    }

    if (estado === "success") {
        const cantidad = Number(datos.cantidad || 0);
        const metaTexto = describirMetadatosAPI(datos.meta);
        const base = datos.mensaje || `API REST conectada · GET /api/v1/hoteles/ · HTTP ${datos.status || 200} · ${cantidad} alojamiento${cantidad === 1 ? "" : "s"}`;
        setTexto(
            "api-success-text",
            metaTexto ? `${base} · ${metaTexto}` : base
        );
        success?.classList.remove("hidden");
    }
}

class APIRequestError extends Error {
    constructor(message, status = 0, code = "API_ERROR", payload = null) {
        super(message);
        this.name = "APIRequestError";
        this.status = status;
        this.code = code;
        this.payload = payload;
    }
}

function extraerMetadatosRespuesta(headers) {
    if (!headers) return {};

    const cache = (headers.get("X-Cache") || "").trim().toUpperCase();
    const ttlCrudo = Number(headers.get("X-Cache-TTL"));
    const fuente = (headers.get("X-Data-Source") || headers.get("X-Source") || "").trim();
    const actualizado = (headers.get("X-Last-Updated") || "").trim();

    return {
        cache: cache === "HIT" || cache === "MISS" ? cache : "",
        ttl: Number.isFinite(ttlCrudo) && ttlCrudo >= 0 ? ttlCrudo : null,
        fuente,
        actualizado
    };
}

function describirMetadatosAPI(meta = {}) {
    const partes = [];

    if (meta.cache) partes.push(`Caché: ${meta.cache}`);
    if (meta.ttl !== null && meta.ttl !== undefined) partes.push(`TTL: ${meta.ttl}s`);
    if (meta.fuente) partes.push(`Origen: ${meta.fuente}`);
    if (meta.actualizado) partes.push(`Actualizado: ${formatearFechaActualizacion(meta.actualizado)}`);

    return partes.join(" · ");
}

async function solicitarJSON(url, options = {}, timeoutMs = API_TIMEOUT_MS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                Accept: "application/json",
                ...(options.headers || {})
            },
            signal: controller.signal
        });

        let data = null;
        const contentType = response.headers.get("content-type") || "";

        if (response.status !== 204) {
            if (contentType.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }
        }

        if (!response.ok) {
            const apiMessage =
                (data && typeof data === "object" && (data.message || data.detail)) ||
                `La API respondió con HTTP ${response.status}.`;

            throw new APIRequestError(apiMessage, response.status, "HTTP_ERROR", data);
        }

        return {
            data,
            status: response.status,
            headers: response.headers,
            meta: extraerMetadatosRespuesta(response.headers)
        };
    } catch (error) {
        if (error instanceof APIRequestError) throw error;

        if (error.name === "AbortError") {
            throw new APIRequestError(
                `La API tardó más de ${Math.round(timeoutMs / 1000)} segundos en responder.`,
                0,
                "TIMEOUT"
            );
        }

        throw new APIRequestError(
            "No se pudo establecer conexión con la API REST.",
            0,
            "NETWORK_ERROR"
        );
    } finally {
        clearTimeout(timeoutId);
    }
}

function obtenerMensajeAPI(error, contexto = "lista") {
    const recurso = contexto === "detalle"
        ? "alojamiento"
        : contexto === "actividades"
            ? "actividades"
            : "alojamientos";

    if (error?.code === "TIMEOUT") {
        return {
            titulo: "La API está tardando demasiado",
            mensaje: `${error.message} Podés volver a intentarlo.`
        };
    }

    if (error?.status === 404) {
        return {
            titulo: contexto === "detalle" ? "Alojamiento no encontrado" : contexto === "actividades" ? "Actividades no encontradas" : "Recurso no encontrado",
            mensaje: error.message || `La API no encontró el recurso solicitado.`
        };
    }

    if (error?.status >= 500) {
        return {
            titulo: "Error del servidor",
            mensaje: `La API respondió con HTTP ${error.status}. Intentá nuevamente en unos instantes.`
        };
    }

    if (error?.status >= 400) {
        return {
            titulo: "La API rechazó la solicitud",
            mensaje: `${error.message || "Solicitud inválida."} (HTTP ${error.status})`
        };
    }

    if (error?.code === "INVALID_RESPONSE") {
        return {
            titulo: "Respuesta inesperada",
            mensaje: error.message
        };
    }

    return {
        titulo: contexto === "actividades" ? "No se pudieron cargar las actividades" : `No se pudo cargar el ${recurso}`,
        mensaje: "No hay conexión con la API REST. Verificá que FastAPI esté iniciado en localhost:8000. Si el servidor está activo y usás Live Server, también debe estar habilitado CORS para el origen del frontend."
    };
}

function normalizarHotel(hotel) {
    const categoriaOriginal = hotel.categoria;
    const categoria = Number.isFinite(Number(categoriaOriginal)) && String(categoriaOriginal).trim() !== ""
        ? `${Number(categoriaOriginal)} Estrellas`
        : (categoriaOriginal || "Sin categoría");

    const precioBase = numeroSeguro(hotel.precio_base ?? hotel.precio_noche ?? 0);
    const precioExterno = numeroSeguro(
        hotel.precio_actual ??
        hotel.precio_promocional ??
        hotel.precio_externo ??
        hotel.tarifa_externa ??
        hotel.precio_oferta ??
        hotel.promocion?.precio ??
        0
    );

    const descuentoInformado = numeroSeguro(
        hotel.descuento_porcentaje ??
        hotel.promocion?.descuento_porcentaje ??
        hotel.descuento ??
        0
    );

    const precioActual = precioExterno > 0 ? precioExterno : precioBase;
    const precioAnterior = numeroSeguro(
        hotel.precio_anterior ??
        (precioExterno > 0 && precioBase > 0 ? precioBase : 0)
    );

    const descuentoCalculado = precioAnterior > precioActual && precioAnterior > 0
        ? Math.round((1 - precioActual / precioAnterior) * 100)
        : 0;

    const proveedorExterno = hotel.proveedor || hotel.proveedor_externo || "";
    const datosSimulados = hotel.datos_simulados === true || hotel.modo === "simulacion";

    const fuenteExterna = datosSimulados && proveedorExterno
        ? `${proveedorExterno} (proveedor de referencia · datos simulados)`
        : (
            hotel.fuente_externa ||
            hotel.fuente_precio ||
            proveedorExterno ||
            hotel.fuente ||
            ""
        );

    const fechaActualizacion =
        hotel.fecha_actualizacion ||
        hotel.actualizado_en ||
        hotel.updated_at ||
        "";

    const promocionTitulo =
        hotel.promocion_titulo ||
        hotel.promocion?.titulo ||
        (precioExterno > 0 && precioExterno < precioBase ? "Tarifa promocional" : "");

    return {
        id: hotel.id ?? "",
        nombre: hotel.nombre || "Alojamiento",
        categoria,
        ubicacion: hotel.ubicacion || hotel.direccion || "Posadas, Misiones",
        precio: precioActual,
        precioBase,
        precioAnterior,
        descuento: descuentoInformado || descuentoCalculado,
        promocionTitulo,
        tienePrecioExterno: precioExterno > 0,
        tienePromocion: Boolean(promocionTitulo) || descuentoInformado > 0 || descuentoCalculado > 0,
        proveedor: proveedorExterno,
        externalId: hotel.external_id || hotel.id_externo || "",
        datosSimulados,
        servicios: Array.isArray(hotel.servicios)
            ? hotel.servicios
            : (hotel.servicio ? String(hotel.servicio).split(",").map(s => s.trim()) : ["Servicios a consultar"]),
        imagen: hotel.imagen || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        fuente: fuenteExterna || "API REST / base de datos",
        urlFuente: hotel.url_fuente || hotel.fuente_url || "",
        actualizacion: fechaActualizacion ? formatearFechaActualizacion(fechaActualizacion) : "Sin fecha informada"
    };
}

function numeroSeguro(valor) {
    const numero = Number(valor);
    return Number.isFinite(numero) ? numero : 0;
}

function formatearFechaActualizacion(valor) {
    if (!valor) return "Sin fecha informada";
    const texto = String(valor);
    const fecha = new Date(texto);
    if (Number.isNaN(fecha.getTime())) return texto;

    return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).format(fecha);
}

function renderizarHoteles(lista, container) {
    if (!container) return;
    container.innerHTML = "";

    if (!Array.isArray(lista) || lista.length === 0) {
        container.innerHTML = '<div class="card-panel"><p>No hay alojamientos para mostrar.</p></div>';
        return;
    }

    lista.forEach(item => {
        const hotel = normalizarHotel(item);
        const serviciosHTML = hotel.servicios
            .filter(Boolean)
            .map(servicio => `<span class="tag-item">${servicio}</span>`)
            .join("");

        const precio = hotel.precio > 0
            ? `$${hotel.precio.toLocaleString("es-AR")}`
            : "Consultar";

        const precioAnteriorHTML = hotel.precioAnterior > hotel.precio && hotel.precio > 0
            ? `<span class="hotel-old-price">$${hotel.precioAnterior.toLocaleString("es-AR")}</span>`
            : "";

        const badgeHTML = hotel.tienePrecioExterno
            ? `<span class="external-price-badge">${hotel.datosSimulados ? "Tarifa simulada" : (hotel.tienePromocion ? "Oferta externa" : "Precio externo")}${hotel.descuento > 0 ? ` · -${hotel.descuento}%` : ""}</span>`
            : "";

        const subtituloPrecio = hotel.tienePromocion
            ? (hotel.promocionTitulo || "tarifa promocional por noche")
            : "precio base por noche";

        container.insertAdjacentHTML("beforeend", `
            <article class="hotel-card hotel-card-clickable" data-hotel-id="${hotel.id}" tabindex="0" role="link" aria-label="Ver detalle de ${hotel.nombre}">
                <img src="${hotel.imagen}" alt="${hotel.nombre}" class="hotel-card-img">
                <div class="hotel-card-content">
                    <div>
                        <div class="hotel-card-header">
                            <div>
                                <h3 class="hotel-name">${hotel.nombre}</h3>
                                <div class="hotel-meta">${hotel.ubicacion} · ${hotel.categoria}</div>
                            </div>
                            <div class="hotel-price">
                                ${badgeHTML}
                                ${precioAnteriorHTML}
                                <span class="hotel-current-price">${precio}</span>
                                <div class="hotel-price-sub">${subtituloPrecio}</div>
                            </div>
                        </div>
                        <div class="tag-list">${serviciosHTML}</div>
                    </div>
                    <div class="hotel-card-bottom">
                        <div class="source-info source-info-a03">
                            <strong>${hotel.datosSimulados ? "Proveedor de referencia" : (hotel.tienePrecioExterno ? "Fuente del precio" : "Fuente")}:</strong> ${hotel.fuente}
                            <span>Actualizado: ${hotel.actualizacion}</span>${hotel.datosSimulados ? '<small>Prototipo académico: no existe conexión real con Booking.com.</small>' : ''}
                        </div>
                        <button type="button" class="btn-reservar" data-hotel-id="${hotel.id}">Reservar</button>
                    </div>
                </div>
            </article>
        `);
    });
}

function inicializarInteraccionTarjetas() {
    const listado = document.getElementById("listado");
    if (!listado) return;

    listado.addEventListener("click", event => {
        const tarjeta = event.target.closest(".hotel-card");
        if (!tarjeta) return;
        const reservar = Boolean(event.target.closest(".btn-reservar"));
        navegarDetalleHotel(tarjeta.dataset.hotelId, reservar);
    });

    listado.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        const tarjeta = event.target.closest(".hotel-card");
        if (!tarjeta) return;
        event.preventDefault();
        navegarDetalleHotel(tarjeta.dataset.hotelId, false);
    });
}

function navegarDetalleHotel(id, reservar = false) {
    const estado = guardarEstadoBusqueda();
    const params = new URLSearchParams();
    params.set("id", id);
    if (estado.checkin) params.set("checkin", estado.checkin);
    if (estado.checkout) params.set("checkout", estado.checkout);
    if (estado.adultos) params.set("adultos", estado.adultos);
    if (A03_DEMO_MODE) params.set("demoA03", "1");
    window.location.href = `hotel.html?${params.toString()}${reservar ? "#reservar" : ""}`;
}

// =========================
// ACTIVIDADES Y OFERTAS
// =========================
let cargandoActividades = false;

async function inicializarIntegracionActividades() {
    const retryButton = document.getElementById("btn-reintentar-actividades");
    if (retryButton) retryButton.onclick = () => cargarActividades();
    await cargarActividades();
}

async function cargarActividades() {
    if (cargandoActividades) return;

    const container = document.getElementById("listado-actividades");
    if (!container) return;

    cargandoActividades = true;
    container.innerHTML = "";
    mostrarEstadoActividades("loading");

    const url = A04_DEMO_MODE ? A04_DEMO_ACTIVITIES_URL : API_URL_ACTIVIDADES;

    try {
        const resultado = await solicitarJSON(url, {}, A04_DEMO_MODE ? 3000 : API_TIMEOUT_MS);
        const actividades = extraerListaActividades(resultado.data).map(normalizarActividad);

        if (actividades.length === 0) {
            mostrarEstadoActividades("empty");
            return;
        }

        renderizarActividades(actividades);
        mostrarEstadoActividades("success", {
            status: resultado.status,
            cantidad: actividades.length,
            meta: resultado.meta,
            mensaje: A04_DEMO_MODE
                ? `Modo demostración A04 · ${actividades.length} actividades simuladas desde una fuente externa de referencia`
                : `API REST conectada · GET /api/v1/actividades/ · HTTP ${resultado.status || 200} · ${actividades.length} actividad${actividades.length === 1 ? "" : "es"}`
        });
    } catch (error) {
        console.error("Error al cargar actividades:", error);
        const datos = A04_DEMO_MODE
            ? {
                titulo: "No se pudo cargar la demostración A04",
                mensaje: "Verificá que data/actividades_mock.json exista y que el proyecto se abra con Live Server."
            }
            : obtenerMensajeAPI(error, "actividades");
        mostrarEstadoActividades("error", datos);
    } finally {
        cargandoActividades = false;
    }
}

function extraerListaActividades(payload) {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.actividades)) return payload.actividades;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
}

function normalizarActividad(act = {}) {
    const precioCrudo = act.precio ?? act.precio_base ?? act.tarifa ?? 0;
    const precio = Number(precioCrudo);

    return {
        id: act.id ?? act.actividad_id ?? act.external_id ?? "",
        externalId: act.external_id ?? act.id_externo ?? "",
        nombre: act.nombre ?? act.titulo ?? "Actividad sin nombre",
        tipo: act.tipo ?? act.categoria ?? "Actividad",
        descripcion: act.descripcion ?? act.detalle ?? "Sin descripción disponible.",
        precio: Number.isFinite(precio) ? precio : 0,
        moneda: act.moneda ?? "ARS",
        ubicacion: act.ubicacion ?? act.direccion ?? "Posadas, Misiones",
        proveedor: act.proveedor ?? act.fuente ?? "Fuente externa no informada",
        fechaActualizacion: act.fecha_actualizacion ?? act.actualizado_en ?? null,
        datosSimulados: Boolean(act.datos_simulados),
        imagen: act.imagen ?? act.imagen_url ?? "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    };
}

function renderizarActividades(actividades) {
    const container = document.getElementById("listado-actividades");
    if (!container) return;

    container.innerHTML = actividades.map(act => {
        const precio = act.precio === 0
            ? "Gratuito"
            : `${act.moneda === "ARS" ? "$" : `${act.moneda} `}${act.precio.toLocaleString("es-AR")}`;

        return `
            <article class="activity-card">
                <img class="activity-image" src="${escaparHTML(act.imagen)}" alt="${escaparHTML(act.nombre)}">
                <div class="activity-content">
                    <span class="activity-type">${escaparHTML(act.tipo)}</span>
                    <h3>${escaparHTML(act.nombre)}</h3>
                    <p>${escaparHTML(act.descripcion)}</p>

                    <div class="activity-location">📍 ${escaparHTML(act.ubicacion)}</div>

                    <div class="activity-footer">
                        <span class="activity-price">${precio}</span>
                        ${act.externalId ? `<span class="small-muted">ID externo: ${escaparHTML(String(act.externalId))}</span>` : ""}
                    </div>

                    <div class="activity-source-a04">
                        <strong>Fuente / proveedor:</strong> ${escaparHTML(act.proveedor)}
                        <span>Actualizado: ${formatearFechaActualizacion(act.fechaActualizacion)}</span>
                        ${act.datosSimulados ? '<small>Datos simulados para validar A04; preparados para ser reemplazados por una API externa o por el endpoint del backend.</small>' : ''}
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function mostrarEstadoActividades(estado, datos = {}) {
    const loading = document.getElementById("loading-actividades");
    const error = document.getElementById("error-actividades");
    const empty = document.getElementById("empty-actividades");
    const success = document.getElementById("success-actividades");

    [loading, error, empty, success].forEach(elemento => elemento?.classList.add("hidden"));

    if (estado === "loading") {
        loading?.classList.remove("hidden");
        return;
    }

    if (estado === "error") {
        setTexto("actividad-error-title", datos.titulo || "No se pudieron cargar las actividades");
        setTexto("actividad-error-message", datos.mensaje || "No fue posible completar la petición.");
        error?.classList.remove("hidden");
        return;
    }

    if (estado === "empty") {
        empty?.classList.remove("hidden");
        return;
    }

    if (estado === "success") {
        const metaTexto = describirMetadatosAPI(datos.meta);
        const base = datos.mensaje || "Actividades cargadas correctamente.";
        setTexto("actividad-success-text", metaTexto ? `${base} · ${metaTexto}` : base);
        success?.classList.remove("hidden");
    }
}

function renderizarOfertas() {
    const container = document.getElementById("listado-ofertas");
    if (!container) return;

    container.innerHTML = MOCK_OFERTAS.map(oferta => `
        <article class="offer-card">
            <img class="offer-image" src="${oferta.imagen}" alt="${oferta.titulo}">
            <div class="offer-content">
                <span class="offer-badge">${oferta.descuento}</span>
                <h3>${oferta.titulo}</h3>
                <p>${oferta.descripcion}</p>
                <div class="offer-footer">
                    <div>
                        <div class="small-muted">${oferta.hotel}</div>
                        ${oferta.precio_anterior ? `<div class="offer-old-price">$${oferta.precio_anterior.toLocaleString("es-AR")}</div>` : ""}
                        <div class="offer-price">Desde $${oferta.precio.toLocaleString("es-AR")}</div>
                    </div>
                </div>
                <div class="offer-source-a03">
                    <strong>Proveedor de referencia:</strong> ${oferta.fuente || "No informado"}
                    <span>Actualizado: ${formatearFechaActualizacion(oferta.fecha_actualizacion)}</span>
                    <small>Datos simulados para el prototipo académico; no existe conexión real con Booking.com.</small>
                </div>
            </div>
        </article>
    `).join("");
}

// =========================
// DETALLE DE HOTEL Y RESERVA
// =========================
async function inicializarDetalleHotel() {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const retryButton = document.getElementById("btn-reintentar-hotel");

    if (retryButton) {
        retryButton.onclick = () => inicializarDetalleHotel();
    }

    if (!Number.isInteger(id) || id <= 0) {
        mostrarEstadoDetalleAPI("error", {
            titulo: "Identificador inválido",
            mensaje: "La dirección no contiene un ID de hotel válido.",
            endpoint: "GET /api/v1/hoteles/{id}"
        });
        return;
    }

    mostrarEstadoDetalleAPI("loading", {
        endpoint: `GET /api/v1/hoteles/${id}`
    });

    try {
        const hotel = A03_DEMO_MODE
            ? await obtenerHotelDemoA03PorId(id)
            : await obtenerHotelPorId(id);
        const detalle = DETALLES_HOTELES[id] || crearDetalleGenerico(hotel);

        renderizarDetalleHotel(hotel, detalle);
        inicializarFormularioEstadia(hotel);
        inicializarModalPago(hotel);
        mostrarEstadoDetalleAPI("success", {
            endpoint: `GET /api/v1/hoteles/${id}`,
            meta: hotel._apiMeta || {},
            demo: A03_DEMO_MODE
        });

        if (window.location.hash === "#reservar") {
            setTimeout(() => document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
        }

        const pendiente = leerJSON(sessionStorage.getItem(PENDING_BOOKING_KEY));
        if (pendiente && Number(pendiente.hotelId) === Number(hotel.id) && obtenerSesion()) {
            restaurarReservaPendiente(pendiente);
            actualizarResumenEstadia(hotel);
            sessionStorage.removeItem(PENDING_BOOKING_KEY);
            const mensaje = document.getElementById("mensaje-estadia");
            mostrarMensajeReserva(mensaje, "Sesión iniciada. Revisá los datos y presioná ‘Reservar ahora’ para continuar.", "ok");
        }
    } catch (error) {
        console.error(`Error al consumir GET /api/v1/hoteles/${id}:`, error);
        const info = obtenerMensajeAPI(error, "detalle");
        mostrarEstadoDetalleAPI("error", {
            ...info,
            endpoint: `GET /api/v1/hoteles/${id}`
        });
    }
}

async function obtenerHotelDemoA03PorId(id) {
    const resultado = await solicitarJSON(A03_DEMO_PRICES_URL, {}, 3000);
    const preciosExternos = Array.isArray(resultado.data) ? resultado.data : [];
    const hoteles = enriquecerHotelesConPreciosExternos(MOCK_HOTELES, preciosExternos);
    const hotel = hoteles.find(item => Number(item.id) === Number(id));

    if (!hotel) {
        throw new APIRequestError("Hotel de demostración no encontrado.", 404, "HTTP_ERROR");
    }

    const normalizado = normalizarHotel(hotel);
    normalizado._apiMeta = { fuente: "Proveedor simulado A03" };
    return normalizado;
}

async function obtenerHotelPorId(id) {
    const resultado = await solicitarJSON(`${API_URL_HOTELES}${id}`, { method: "GET" });

    if (!resultado.data || typeof resultado.data !== "object" || Array.isArray(resultado.data)) {
        throw new APIRequestError(
            "La API respondió con un formato inesperado para el alojamiento.",
            resultado.status,
            "INVALID_RESPONSE"
        );
    }

    const normalizado = normalizarHotel(resultado.data);
    normalizado._apiMeta = resultado.meta || {};
    return normalizado;
}

function mostrarEstadoDetalleAPI(estado, datos = {}) {
    const shell = document.getElementById("hotel-detail-shell");
    const status = document.getElementById("detalle-api-status");
    const actions = document.getElementById("detalle-api-actions");
    const metaNote = document.getElementById("detalle-api-meta");

    if (!shell || !status) return;

    shell.classList.remove("api-pending", "api-error", "api-ready");
    status.classList.remove("api-state-loading", "api-state-error");
    actions?.classList.add("hidden");

    if (estado === "success") {
        shell.classList.add("api-ready");
        status.classList.add("hidden");

        if (metaNote) {
            const metaTexto = describirMetadatosAPI(datos.meta);
            metaNote.textContent = datos.demo
                ? "Detalle cargado en modo demostración A03."
                : `API REST · ${datos.endpoint || "GET /api/v1/hoteles/{id}"}${metaTexto ? ` · ${metaTexto}` : ""}`;
            metaNote.classList.remove("hidden");
        }
        return;
    }

    metaNote?.classList.add("hidden");
    status.classList.remove("hidden");
    setTexto("detalle-api-endpoint", datos.endpoint || "GET /api/v1/hoteles/{id}");

    if (estado === "loading") {
        shell.classList.add("api-pending");
        status.classList.add("api-state-loading");
        setTexto("detalle-api-title", A03_DEMO_MODE ? "Cargando demostración A03..." : "Consultando alojamiento...");
        setTexto("detalle-api-message", A03_DEMO_MODE
            ? "Combinando el hotel de demostración con una tarifa externa simulada."
            : "Solicitando el recurso individual a la API REST.");
        return;
    }

    shell.classList.add("api-error");
    status.classList.add("api-state-error");
    setTexto("detalle-api-title", datos.titulo || "No se pudo cargar el alojamiento");
    setTexto("detalle-api-message", datos.mensaje || "No fue posible completar la petición.");
    actions?.classList.remove("hidden");
}

function crearDetalleGenerico(hotel) {
    return {
        descripcion: `Información general de ${hotel.nombre}. Los datos principales del alojamiento se obtuvieron mediante la API REST; esta descripción complementaria permanece como contenido demostrativo del frontend.`,
        zona: hotel.ubicacion || "Posadas, Misiones.",
        seguridad: "Información orientativa del prototipo. Para una reserva real, consultá recomendaciones actualizadas del alojamiento y organismos oficiales.",
        movilidad: "La disponibilidad de transporte depende de la ubicación del alojamiento y del horario del viaje.",
        entorno: "Consultá la ubicación exacta y los puntos de interés cercanos antes de confirmar la estadía.",
        politica: "Horarios a confirmar con el alojamiento.",
        galeria: [
            hotel.imagen,
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80"
        ].filter(Boolean)
    };
}

function renderizarDetalleHotel(hotel, detalle) {
    document.title = `${hotel.nombre} - PosadasTurismo`;
    setTexto("detalle-hotel-nombre", hotel.nombre);
    setTexto("detalle-hotel-categoria", hotel.categoria);
    setTexto("detalle-hotel-ubicacion", hotel.ubicacion);
    setTexto("detalle-hotel-precio", hotel.precio > 0 ? `$${hotel.precio.toLocaleString("es-AR")}` : "Consultar");
    setTexto("detalle-hotel-descripcion", detalle.descripcion);

    const precioAnterior = document.getElementById("detalle-precio-anterior");
    const promo = document.getElementById("detalle-promocion-precio");
    const bloqueFuente = document.getElementById("detalle-fuente-precio");

    if (precioAnterior) {
        if (hotel.precioAnterior > hotel.precio && hotel.precio > 0) {
            precioAnterior.textContent = `$${hotel.precioAnterior.toLocaleString("es-AR")}`;
            precioAnterior.classList.remove("hidden");
        } else {
            precioAnterior.classList.add("hidden");
        }
    }

    if (promo) {
        if (hotel.tienePrecioExterno) {
            promo.textContent = `${hotel.datosSimulados ? "Tarifa simulada" : (hotel.tienePromocion ? (hotel.promocionTitulo || "Tarifa promocional") : "Tarifa externa")}${hotel.descuento > 0 ? ` · ${hotel.descuento}% de ahorro` : ""}`;
            promo.classList.remove("hidden");
        } else {
            promo.classList.add("hidden");
        }
    }

    if (bloqueFuente) {
        setTexto("detalle-fuente-precio-texto", hotel.fuente);
        setTexto("detalle-fecha-precio", hotel.actualizacion);
        bloqueFuente.classList.remove("hidden");
    }
    setTexto("detalle-zona", detalle.zona);
    setTexto("detalle-seguridad", detalle.seguridad);
    setTexto("detalle-movilidad", detalle.movilidad);
    setTexto("detalle-entorno", detalle.entorno);
    setTexto("detalle-politica", detalle.politica);
    setTexto("reserva-hotel-nombre-lateral", hotel.nombre);

    const servicios = document.getElementById("detalle-servicios");
    if (servicios) {
        servicios.innerHTML = hotel.servicios.map(item => `<span class="detail-service-chip">✓ ${item}</span>`).join("");
    }

    const galeria = document.getElementById("detalle-galeria");
    if (galeria) {
        galeria.innerHTML = detalle.galeria.map((src, index) => `
            <img class="detail-gallery-img detail-gallery-img-${index + 1}" src="${src}" alt="${hotel.nombre} - imagen ${index + 1}">
        `).join("");
    }
}

function inicializarFormularioEstadia(hotel) {
    const form = document.getElementById("form-estadia");
    if (!form) return;

    const checkin = document.getElementById("reserva-checkin");
    const checkout = document.getElementById("reserva-checkout");
    const adultos = document.getElementById("reserva-adultos");
    const ninos = document.getElementById("reserva-ninos");
    const habitaciones = document.getElementById("reserva-habitaciones");
    const mensaje = document.getElementById("mensaje-estadia");
    const params = new URLSearchParams(window.location.search);

    const hoy = fechaISO(new Date());
    checkin.min = hoy;
    checkout.min = hoy;

    if (params.get("checkin")) checkin.value = params.get("checkin");
    if (params.get("checkout")) checkout.value = params.get("checkout");
    if (params.get("adultos")) adultos.value = params.get("adultos");

    if (!checkin.value) checkin.value = fechaISO(sumarDias(new Date(), 1));
    if (!checkout.value) checkout.value = fechaISO(sumarDias(new Date(), 2));
    checkout.min = checkin.value || hoy;

    [checkin, checkout, adultos, ninos, habitaciones].forEach(control => {
        control.addEventListener("change", () => {
            if (control === checkin) {
                checkout.min = checkin.value;
                if (checkout.value && checkout.value <= checkin.value) {
                    checkout.value = fechaISO(sumarDias(fechaDesdeISO(checkin.value), 1));
                }
            }
            actualizarResumenEstadia(hotel);
        });
    });

    actualizarResumenEstadia(hotel);

    form.addEventListener("submit", event => {
        event.preventDefault();
        const reserva = construirReservaActual(hotel);

        if (!reserva.valida) {
            mostrarMensajeReserva(mensaje, reserva.error, "error");
            return;
        }

        if (!obtenerSesion()) {
            sessionStorage.setItem(PENDING_BOOKING_KEY, JSON.stringify(reserva));
            mostrarMensajeReserva(mensaje, "Para reservar necesitás crear una cuenta o iniciar sesión. Te llevamos al acceso...", "info");
            const retorno = `hotel.html?id=${encodeURIComponent(hotel.id)}#reservar`;
            setTimeout(() => {
                window.location.href = `login.html?return=${encodeURIComponent(retorno)}`;
            }, 800);
            return;
        }

        mostrarMensajeReserva(mensaje, "Datos de estadía completos. Continuá con el pago simulado.", "ok");
        abrirModalPago(hotel, reserva);
    });
}

function construirReservaActual(hotel) {
    const checkin = document.getElementById("reserva-checkin")?.value;
    const checkout = document.getElementById("reserva-checkout")?.value;
    const adultos = Number(document.getElementById("reserva-adultos")?.value || 1);
    const ninos = Number(document.getElementById("reserva-ninos")?.value || 0);
    const habitaciones = Number(document.getElementById("reserva-habitaciones")?.value || 1);

    if (!checkin || !checkout) return { valida: false, error: "Seleccioná las fechas de entrada y salida." };

    const noches = calcularNoches(checkin, checkout);
    if (noches <= 0) return { valida: false, error: "La fecha de salida debe ser posterior a la fecha de entrada." };

    const total = hotel.precio > 0 ? hotel.precio * noches * habitaciones : 0;
    return {
        valida: true,
        hotelId: hotel.id,
        hotelNombre: hotel.nombre,
        checkin,
        checkout,
        adultos,
        ninos,
        habitaciones,
        noches,
        precioNoche: hotel.precio,
        total
    };
}

function actualizarResumenEstadia(hotel) {
    const reserva = construirReservaActual(hotel);
    const nochesEl = document.getElementById("resumen-noches");
    const huespedesEl = document.getElementById("resumen-huespedes");
    const totalEl = document.getElementById("resumen-total");

    if (!reserva.valida) {
        setTexto("resumen-noches", "—");
        setTexto("resumen-huespedes", "—");
        setTexto("resumen-total", "—");
        return;
    }

    nochesEl.textContent = `${reserva.noches} ${reserva.noches === 1 ? "noche" : "noches"}`;
    huespedesEl.textContent = `${reserva.adultos + reserva.ninos} huésped${reserva.adultos + reserva.ninos === 1 ? "" : "es"} · ${reserva.habitaciones} habitación${reserva.habitaciones === 1 ? "" : "es"}`;
    totalEl.textContent = reserva.total > 0 ? `$${reserva.total.toLocaleString("es-AR")}` : "Consultar";
}

function restaurarReservaPendiente(reserva) {
    if (reserva.checkin) document.getElementById("reserva-checkin").value = reserva.checkin;
    if (reserva.checkout) document.getElementById("reserva-checkout").value = reserva.checkout;
    if (reserva.adultos) document.getElementById("reserva-adultos").value = reserva.adultos;
    document.getElementById("reserva-ninos").value = reserva.ninos ?? 0;
    if (reserva.habitaciones) document.getElementById("reserva-habitaciones").value = reserva.habitaciones;
}

function inicializarModalPago(hotel) {
    const modal = document.getElementById("modal-reserva");
    const form = document.getElementById("form-reserva");
    if (!modal || !form) return;

    const cerrar = () => {
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-abierto");
        form.reset();
        const mensaje = document.getElementById("mensaje-reserva");
        if (mensaje) mensaje.className = "mensaje-reserva hidden";
    };

    document.getElementById("btn-cerrar-modal")?.addEventListener("click", cerrar);
    document.getElementById("btn-cancelar-reserva")?.addEventListener("click", cerrar);
    modal.querySelector("[data-cerrar-modal]")?.addEventListener("click", cerrar);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !modal.classList.contains("hidden")) cerrar();
    });

    form.addEventListener("submit", async event => {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const reserva = leerJSON(modal.dataset.reserva);
        if (!reserva) return;

        const btn = document.getElementById("btn-confirmar-reserva");
        const mensaje = document.getElementById("mensaje-reserva");
        btn.disabled = true;
        btn.textContent = "Procesando...";
        mensaje.className = "mensaje-reserva mensaje-procesando";
        mensaje.textContent = "Procesando reserva simulada...";

        await esperar(2000);

        const codigo = `PT-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
        guardarReservaDemo({ ...reserva, codigo, usuario: obtenerSesion()?.email || "" });

        mensaje.className = "mensaje-reserva mensaje-exito";
        mensaje.textContent = `✓ Reserva confirmada con éxito · Código ${codigo}`;
        form.reset();
        btn.disabled = false;
        btn.textContent = "Confirmar reserva";
    });
}

function abrirModalPago(hotel, reserva) {
    const modal = document.getElementById("modal-reserva");
    if (!modal) return;

    modal.dataset.reserva = JSON.stringify(reserva);
    setTexto("modal-hotel-nombre", hotel.nombre);
    setTexto("modal-hotel-precio", hotel.precio > 0 ? `$${hotel.precio.toLocaleString("es-AR")} / noche` : "Consultar");
    setTexto("modal-reserva-fechas", `${formatearFecha(reserva.checkin)} → ${formatearFecha(reserva.checkout)}`);
    setTexto("modal-reserva-huespedes", `${reserva.adultos} adulto${reserva.adultos === 1 ? "" : "s"}, ${reserva.ninos} niño${reserva.ninos === 1 ? "" : "s"}, ${reserva.habitaciones} habitación${reserva.habitaciones === 1 ? "" : "es"}`);
    setTexto("modal-reserva-total", reserva.total > 0 ? `$${reserva.total.toLocaleString("es-AR")}` : "Consultar");

    const mensaje = document.getElementById("mensaje-reserva");
    if (mensaje) mensaje.className = "mensaje-reserva hidden";

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-abierto");
    setTimeout(() => document.getElementById("titular-tarjeta")?.focus(), 60);
}

function guardarReservaDemo(reserva) {
    const existentes = leerJSON(localStorage.getItem(RESERVATIONS_KEY)) || [];
    existentes.push({
        ...reserva,
        estado: "Confirmada (simulación)",
        creadaEn: new Date().toISOString()
    });
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(existentes));
}

function mostrarMensajeReserva(elemento, texto, tipo) {
    if (!elemento) return;
    elemento.className = `booking-message ${tipo}`;
    elemento.textContent = texto;
}

// =========================
// UTILIDADES
// =========================
function calcularNoches(checkin, checkout) {
    const entrada = fechaDesdeISO(checkin);
    const salida = fechaDesdeISO(checkout);
    if (!entrada || !salida) return 0;
    return Math.round((salida - entrada) / 86400000);
}

function fechaDesdeISO(valor) {
    if (!valor) return null;
    const [y, m, d] = valor.split("-").map(Number);
    return new Date(y, m - 1, d);
}

function fechaISO(fecha) {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function sumarDias(fecha, dias) {
    const copia = new Date(fecha);
    copia.setDate(copia.getDate() + dias);
    return copia;
}

function formatearFecha(valor) {
    const fecha = fechaDesdeISO(valor);
    return fecha ? fecha.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";
}

function leerJSON(valor) {
    try {
        return valor ? JSON.parse(valor) : null;
    } catch {
        return null;
    }
}

function setTexto(id, texto) {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = texto;
}

function esperar(milisegundos) {
    return new Promise(resolve => setTimeout(resolve, milisegundos));
}
