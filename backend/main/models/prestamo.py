from .. import db
from datetime import datetime

class Prestamo(db.Model):
    idPrestamo = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fk_idUser = db.Column(db.Integer, nullable=False)
    fk_idLibro= db.Column(db.Integer, nullable=False)
    inicio_prestamo = db.Column(db.DateTime, nullable=False)
    fin_prestamo = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<id: {self.idPrestamo}, Usuario: {self.fk_idUser}, Libro: {self.fk_idLibro}, Inicio_Prestamo: {self.inicio_prestamo}, Fin_Prestamo: {self.fin_prestamo}"
    
    def to_json(self):
        prestamo_json = {
            "id" : int(self.idPrestamo),
            "Usuario" : int(self.fk_idUser),
            "Libro" : int(self.fk_idLibro),
            "Inicio_Prestamo" : str(self.inicio_prestamo.strftime("%d-%m-%y")),
            "Fin_Prestamo" : str(self.fin_prestamo.strftime("%d-%m-%y"))
        }
        return prestamo_json
    
    @staticmethod
    def from_json(prestamo_json):
        id = prestamo_json.get("id")
        usuario = prestamo_json.get("Usuario")
        libro = prestamo_json.get("Libro")
        inicio_prestamo = datetime.strptime(prestamo_json.get("Inicio_Prestamo"), "%d-%m-%y")
        fin_prestamo = datetime.strptime(prestamo_json.get("Fin_Prestamo"), "%d-%m-%y")
        return Prestamo(
            idPrestamo=id,
            fk_idUser=usuario,
            fk_idLibro=libro,
            inicio_prestamo=inicio_prestamo,
            fin_prestamo=fin_prestamo
        )
