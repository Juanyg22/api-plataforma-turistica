from sqlalchemy import Column, Integer, String, Float
from pydantic import BaseModel, Field
from typing import Optional
from database.connection import Base

# --- MODELO DE BASE DE DATOS (SQLAlchemy) ---
class HotelDB(Base):
    __tablename__ = "hoteles"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    zona_id = Column(Integer, nullable=False)
    precio_base = Column(Float, nullable=False)
    descripcion = Column(String(255))
    direccion = Column(String(200))
    categoria = Column(Integer)
    calificacion = Column(Float, default=0.0)
    servicio = Column(String(255))

# --- ESQUEMAS DE VALIDACIÓN (Pydantic) ---
class HotelBase(BaseModel):
    nombre: str = Field(..., min_length=2, description="Nombre del alojamiento")
    zona_id: int = Field(..., gt=0, description="ID de la zona")
    precio_base: float = Field(..., gt=0, description="Precio por noche")
    descripcion: Optional[str] = None
    direccion: Optional[str] = None
    categoria: Optional[int] = Field(None, ge=1, le=5)
    calificacion: Optional[float] = Field(0.0, ge=0, le=10)
    servicio: Optional[str] = None

class HotelCreate(HotelBase):
    pass

class HotelResponse(HotelBase):
    id: int

    class Config:
        from_attributes = True