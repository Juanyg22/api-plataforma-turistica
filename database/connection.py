import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Cargar variables del .env
load_dotenv()

SERVER = os.getenv("DB_SERVER")
DATABASE = os.getenv("DB_NAME")

# Cadena de conexión adaptada para Autenticación de Windows
DATABASE_URL = f"mssql+pyodbc://{SERVER}/{DATABASE}?driver=ODBC+Driver+17+for+SQL+Server&Trusted_Connection=yes"

# Crear el motor de conexión
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# --- Agrega esto al final del archivo para probar la conexión ---
if __name__ == "__main__":
    from sqlalchemy import text
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT '¡Conexión exitosa a SQL Server!'"))
            for row in result:
                print("\n" + "="*40)
                print(row[0])
                print("="*40 + "\n")
    except Exception as e:
        print("\n❌ Error al conectar a la base de datos:")
        print(e)