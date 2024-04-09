from .. import db
from sqlalchemy import ForeignKey

class Autor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    

    #Convertir objeto en JSON
    def to_json(self):
        autor_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            

        }
        return autor_json