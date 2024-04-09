from .. import db
from sqlalchemy import ForeignKey

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(100), nullable=False)
    contraseña = db.Column(db.Integer, nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    dni = db.Column(db.Integer, nullable=False)
    telefono = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(100), nullable=False)
    

    #Convertir objeto en JSON
    def to_json(self):
        usuario_json = {
            'id': self.id,
            'usuario': str(self.usuario),
            'contraseña': int(self.contraseña),
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'dni': int(self.dni),
            'telefono': int(self.telefono),
            'email': str(self.email),
            'rol': str(self.rol),
            

        }
        return usuario_json