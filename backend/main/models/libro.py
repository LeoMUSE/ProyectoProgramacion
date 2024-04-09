from .. import db
from sqlalchemy import ForeignKey

class Libro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cantidad = db.Column(db.Integer, nullable=False)
    id_autor = db.Column(db.Integer, ForeignKey('autor.id'))
    editorial = db.Column(db.String(100), nullable=False)
    genero = db.Column(db.String(100), nullable=False)
    disponibilidad = db.Column(db.Integer, nullable=False)
    

    #Convertir objeto en JSON
    def to_json(self):
        libro_json = {
            'id': self.id,
            'cantidad': int(self.cantidad),
            'id_autor': self.id_autor,
            'editorial': str(self.editorial),
            'genero': str(self.genero),
            'disponibilidad': int(self.disponibilidad)
            

        }
        return libro_json