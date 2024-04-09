from .. import db
from sqlalchemy import ForeignKey

class Notificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, ForeignKey('usuario.id'))
    descripcion = db.Column(db.String(100), nullable=False)
    
    

    #Convertir objeto en JSON
    def to_json(self):
        notificacion_json = {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'descripcion': str(self.descripcion),
        

        }
        return notificacion_json