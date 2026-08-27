from sqlalchemy.orm import Session
from models.hotel import HotelDB, HotelCreate

class HotelService:
    @staticmethod
    def get_all(db: Session):
        return db.query(HotelDB).all()

    @staticmethod
    def get_by_id(db: Session, hotel_id: int):
        return db.query(HotelDB).filter(HotelDB.id == hotel_id).first()

    @staticmethod
    def create(db: Session, hotel: HotelCreate):
        db_hotel = HotelDB(**hotel.model_dump())
        db.add(db_hotel)
        db.commit()
        db.refresh(db_hotel)
        return db_hotel

    @staticmethod
    def delete(db: Session, hotel_id: int):
        db_hotel = HotelService.get_by_id(db, hotel_id)
        if db_hotel:
            db.delete(db_hotel)
            db.commit()
        return db_hotel