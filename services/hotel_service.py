from sqlalchemy.orm import Session

from models.hotel import HotelDB, HotelCreate


class HotelService:

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(HotelDB)
            .filter(HotelDB.estado == "ACTIVO")
            .all()
        )

    @staticmethod
    def get_by_id(db: Session, hotel_id: int):
        return (
            db.query(HotelDB)
            .filter(
                HotelDB.id == hotel_id,
                HotelDB.estado == "ACTIVO"
            )
            .first()
        )

    @staticmethod
    def get_by_id_any_status(db: Session, hotel_id: int):
        return (
            db.query(HotelDB)
            .filter(HotelDB.id == hotel_id)
            .first()
        )

    @staticmethod
    def create(db: Session, hotel: HotelCreate):
        db_hotel = HotelDB(
            **hotel.model_dump(),
            estado="ACTIVO"
        )

        db.add(db_hotel)
        db.commit()
        db.refresh(db_hotel)

        return db_hotel

    @staticmethod
    def cambiar_estado(
        db: Session,
        hotel_id: int,
        nuevo_estado: str
    ):
        if nuevo_estado not in ["ACTIVO", "INACTIVO"]:
            raise ValueError(
                "El estado debe ser ACTIVO o INACTIVO"
            )

        db_hotel = HotelService.get_by_id_any_status(
            db,
            hotel_id
        )

        if not db_hotel:
            return None

        db_hotel.estado = nuevo_estado

        db.commit()
        db.refresh(db_hotel)

        return db_hotel

    @staticmethod
    def update(
        db: Session,
        hotel_id: int,
        datos_nuevos: HotelCreate
    ):
        hotel_actual = HotelService.get_by_id(
            db,
            hotel_id
        )

        if not hotel_actual:
            return None

        for key, value in datos_nuevos.model_dump().items():
            setattr(hotel_actual, key, value)

        db.commit()
        db.refresh(hotel_actual)

        return hotel_actual