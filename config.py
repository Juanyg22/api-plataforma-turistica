"""Configuración compartida por la API, las pruebas y el consumidor."""

import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
# Las variables del proceso tienen prioridad sobre el archivo local.
load_dotenv(BASE_DIR / ".env")

DB_SERVER = os.getenv("DB_SERVER", "localhost")
DB_NAME = os.getenv("DB_NAME", "TurismoPosadas")
DB_DRIVER = os.getenv("DB_DRIVER", "ODBC Driver 17 for SQL Server")
DB_CONNECT_TIMEOUT = int(os.getenv("DB_CONNECT_TIMEOUT", "5"))
DB_ECHO = os.getenv("DB_ECHO", "false").lower() == "true"
APP_PORT = int(os.getenv("APP_PORT", "8000"))
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "")
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
JWT_ISSUER = os.getenv("JWT_ISSUER", "turismo-posadas-api")
JWT_AUDIENCE = os.getenv("JWT_AUDIENCE", "turismo-posadas-client")
RESERVA_PAGO_MINUTOS = int(os.getenv("RESERVA_PAGO_MINUTOS", "15"))
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS", "http://localhost:5500,http://127.0.0.1:5500"
    ).split(",")
    if origin.strip()
]
