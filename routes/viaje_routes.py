from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.connection import get_db
from models.viaje import ViajeCreate, ViajeResponse
from services.viaje_service import ViajeService


router = APIRouter(
    prefix="/api/v2/viajes",
    tags=["Viajes"]
)


@router.get(
    "/",
    response_model=List[ViajeResponse],
    status_code=status.HTTP_200_OK
)
def listar_viajes(db: Session = Depends(get_db)):
    return ViajeService.get_all(db)


@router.get(
    "/{id}",
    response_model=ViajeResponse,
    status_code=status.HTTP_200_OK
)
def obtener_viaje(id: int, db: Session = Depends(get_db)):
    viaje = ViajeService.get_by_id(db, id)

    if not viaje:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Viaje no encontrado"
        )

    return viaje


@router.post(
    "/",
    response_model=ViajeResponse,
    status_code=status.HTTP_201_CREATED
)
def crear_viaje(
    viaje: ViajeCreate,
    db: Session = Depends(get_db)
):
    return ViajeService.create(db, viaje)