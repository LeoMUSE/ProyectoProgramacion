from .. import db
from sqlalchemy import ForeignKey

class Valoracion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, ForeignKey('usuario.id'))
    id_libro = db.Column(db.Integer, ForeignKey('libro.id'))
    valoracion = db.Column(db.Integer, nullable=False)
    

    #Convertir objeto en JSON
    def to_json(self):
        valoracion_json = {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'id_libro': self.id_libro,
            'valoracion': int(self.valoracion),
          
        }
        return valoracion_json