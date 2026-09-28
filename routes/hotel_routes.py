from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database.connection import get_db
from models.hotel import (
    HotelCreate,
    HotelResponse,
    HotelEstadoUpdate
)
from services.hotel_service import HotelService


router = APIRouter(
    prefix="/api/v1/hoteles",
    tags=["Hoteles"]
)


@router.get(
    "/",
    response_model=List[HotelResponse],
    status_code=status.HTTP_200_OK
)
def listar_hoteles(db: Session = Depends(get_db)):
    return HotelService.get_all(db)


@router.get(
    "/{id}",
    response_model=HotelResponse,
    status_code=status.HTTP_200_OK
)
def obtener_hotel(id: int, db: Session = Depends(get_db)):
    hotel = HotelService.get_by_id(db, id)

    if not hotel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hotel no encontrado"
        )

    return hotel


@router.post(
    "/",
    response_model=HotelResponse,
    status_code=status.HTTP_201_CREATED
)
def crear_hotel(
    hotel: HotelCreate,
    db: Session = Depends(get_db)
):
    return HotelService.create(db, hotel)


@router.put(
    "/{id}",
    response_model=HotelResponse,
    status_code=status.HTTP_200_OK
)
def actualizar_hotel(
    id: int,
    hotel: HotelCreate,
    db: Session = Depends(get_db)
):
    hotel_actualizado = HotelService.update(
        db,
        id,
        hotel
    )

    if not hotel_actualizado:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hotel no encontrado"
        )

    return hotel_actualizado


@router.patch(
    "/{id}/estado",
    response_model=HotelResponse,
    status_code=status.HTTP_200_OK
)
def cambiar_estado_hotel(
    id: int,
    datos: HotelEstadoUpdate,
    db: Session = Depends(get_db)
):
    try:
        hotel = HotelService.cambiar_estado(
            db,
            id,
            datos.estado
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        )

    if not hotel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hotel no encontrado"
        )

    return hotel