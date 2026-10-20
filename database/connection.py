from sqlalchemy import URL, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DB_SERVER, DB_NAME, DB_DRIVER, DB_CONNECT_TIMEOUT, DB_ECHO

# Cadena de conexión adaptada para Autenticación de Windows
DATABASE_URL = URL.create(
    "mssql+pyodbc",
    host=DB_SERVER,
    database=DB_NAME,
    query={"driver": DB_DRIVER, "Trusted_Connection": "yes"},
)

# Crear el motor de conexión
engine = create_engine(
    DATABASE_URL,
    echo=DB_ECHO,
    hide_parameters=True,
    pool_pre_ping=True,
    connect_args={"timeout": DB_CONNECT_TIMEOUT},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# Comprobación local opcional, sin exponer detalles de la conexión.
if __name__ == "__main__":
    from sqlalchemy import text
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        print("OK: conexión SQL Server verificada.")
    except Exception:
        raise SystemExit("No se pudo conectar a SQL Server. Revisar servicio, configuración y permisos de Windows.") from None
