from sqlalchemy.orm import Session

from models.viaje import ViajeDB, ViajeCreate


class ViajeService:

    @staticmethod
    def get_all(db: Session):
        return db.query(ViajeDB).all()

    @staticmethod
    def get_by_id(db: Session, viaje_id: int):
        return (
            db.query(ViajeDB)
            .filter(ViajeDB.id == viaje_id)
            .first()
        )

    @staticmethod
    def create(db: Session, viaje: ViajeCreate):
        db_viaje = ViajeDB(
            **viaje.model_dump(),
            estado="PLANIFICADO"
        )

        db.add(db_viaje)
        db.commit()
        db.refresh(db_viaje)

        return db_viaje