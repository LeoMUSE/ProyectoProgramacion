from .. import db
from datetime import datetime

class Prestamo(db.Model):
    idPrestamo = db.Column(db.Integer, primary_key=True)
    fk_idUser = 0
    fk_idLibro=0
    inicio_prestamo = db.Column(db.DateTime, nullable=False)
    fin_prestamo = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<id: {self.idPrestamo}, Usuario: {self.fk_idUser}, Libro: {self.fk_idLibro}, Inicio_Prestamo: {self.inicio_prestamo}, Fin_Prestamo: {self.fin_prestamo}"
    
    def to_json(self):
        prestamo_json = {
            "id" : int(self.idPrestamo),
            "Usuario" : str(self.fk_idUser),
            "Libro" : str(self.fk_idLibro),
            "Inicio_Prestamo" : str(self.inicio_prestamo.strftime("%d/%m/%Y")),
            "Fin_Prestamo" : str(self.fin_prestamo.strftime("%d/%m/%Y"))
        }
        return prestamo_json
    
    @staticmethod
    def from_json(prestamo_json):
        id = prestamo_json.get("id")
        usuario = prestamo_json.get("Usuario")
        libro = prestamo_json.get("Libro")
        inicio_prestamo = prestamo_json.get("Inicio_Prestamo")
        fin_prestamo = prestamo_json.get("Fin_prestamo")
        return Prestamo(
            idPrestamo=id,
            fk_idUser=usuario,
            fk_idLibro=libro,
            inicio_prestamo=inicio_prestamo,
            fin_prestamo=fin_prestamo
        )

if __name__ == '__main__':
    pass