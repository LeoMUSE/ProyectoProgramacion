from .. import db
from sqlalchemy import ForeignKey


class Prestamo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, ForeignKey('usuario.id'))
    id_libro = db.Column(db.Integer, ForeignKey('libro.id'))
    inicioP = db.Column(db.DateTime, nullable=False)
    finP = db.Column(db.DateTime, nullable=False)
  
    

    #Convertir objeto en JSON
    def to_json(self):
        prestamo_json = {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'id_libro': self.id_libro,
            'inicioP': self.inicioP.strftime('%Y-%m-%d %H:%M:%S'),
            'finP': self.finP.strftime('%Y-%m-%d %H:%M:%S')
         
        }
        return prestamo_json
    


 

