from starlette.exceptions import HTTPException as StarletteHTTPException
import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from dotenv import load_dotenv
from database.connection import Base, engine
from routes.hotel_routes import router as hotel_router

load_dotenv()

# Esto le dice a SQLAlchemy que cree las tablas en SQL Server si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API - Plataforma Turística",
    description="API RESTful para la gestión de hoteles (AE1)",
    version="1.0.0"
)

# 1. MANEJADOR DE VALIDACIONES: Convierte el 422 en 400 (Requerimiento AE1)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errores = []
    for error in exc.errors():
        campo = ".".join(str(loc) for loc in error.get("loc", []) if loc != "body")
        mensaje = error.get("msg", "")
        errores.append(f"{campo}: {mensaje}")
    
    detalle_errores = " | ".join(errores)

    # Retorna 400 Bad Request con estructura estandarizada
    return JSONResponse(
        status_code=400,
        content={
            "error": "Bad Request",
            "message": "Faltan campos obligatorios o los datos son inválidos",
            "details": detalle_errores
        }
    )

# 1.5. MANEJADOR DE EXCEPCIONES HTTP: Estandariza el 404 y otros (Requerimiento AE1)
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    if exc.status_code == 404:
        error_name = "Not Found"
    elif exc.status_code == 400:
        error_name = "Bad Request"
    else:
        error_name = "HTTP Error"

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": error_name,
            "message": exc.detail
        }
    )

# 2. MIDDLEWARE DE ERRORES CENTRALIZADO: Captura fallos imprevistos (500)
@app.middleware("http")
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal Server Error",
                "message": "Ha ocurrido un fallo imprevisto en el servidor.",
                "details": str(e)
            }
        )

# Registrar las rutas del Hotel
app.include_router(hotel_router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("APP_PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)