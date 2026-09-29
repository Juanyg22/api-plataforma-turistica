import pytest

from fastapi import FastAPI
from fastapi.testclient import TestClient

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from database.connection import Base, get_db

# Importamos los modelos para que SQLAlchemy conozca las tablas
from models.hotel import HotelDB
from models.viaje import ViajeDB, ViajeHotelDB

from routes.hotel_routes import router as hotel_router
from routes.viaje_routes import router as viaje_router


# =========================================================
# BASE DE DATOS EXCLUSIVA PARA TESTS
# =========================================================

TEST_DATABASE_URL = "sqlite://"

engine_test = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine_test
)


# =========================================================
# APLICACIÓN FASTAPI EXCLUSIVA PARA TESTS
# =========================================================

app_test = FastAPI()

app_test.include_router(hotel_router)
app_test.include_router(viaje_router)


def override_get_db():
    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()


app_test.dependency_overrides[get_db] = override_get_db


# =========================================================
# FIXTURES
# =========================================================

@pytest.fixture(autouse=True)
def preparar_base_de_datos():
    """
    Antes de cada test se crea una base limpia.
    Al terminar, se eliminan todas las tablas.
    """
    Base.metadata.drop_all(bind=engine_test)
    Base.metadata.create_all(bind=engine_test)

    yield

    Base.metadata.drop_all(bind=engine_test)


@pytest.fixture
def client(monkeypatch):
    """
    Cliente HTTP para probar FastAPI.

    Se reemplaza temporalmente RabbitMQ para evitar que
    los tests dependan de que el broker esté levantado.
    """
    monkeypatch.setattr(
        "routes.hotel_routes.publicar_evento",
        lambda evento: None
    )

    with TestClient(app_test) as test_client:
        yield test_client


@pytest.fixture
def db_session():
    """
    Sesión directa a SQLite para verificar persistencia.
    """
    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()