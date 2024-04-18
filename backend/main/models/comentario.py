from .. import db
from datetime import datetime

class Comentario(db.Model):
    idComentario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fk_idUser = db.Column(db.Integer, nullable=False)
    fk_idLibro = db.Column(db.Integer, nullable=False)
    fecha = db.Column(db.DateTime, nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<id: {self.idComentario}, Usuario: {self.fk_idUser}, Libro:{self.fk_idLibro}, Fecha: {self.fecha}, Descripcion: {self.descripcion}"

    def to_json(self):
        comentario_json = {
            "id" : int(self.idComentario),
            "usuario" : int(self.fk_idUser),
            "libro" : int(self.fk_idLibro),
            "fecha" : str(self.fecha.strftime("%d-%m-%Y")),
            "descripcion" : str(self.descripcion)
        }
        return comentario_json
    
    @staticmethod
    def from_json(comentario_json):
        id = comentario_json.get("id")
        usuario = comentario_json.get("usuario")
        libro = comentario_json.get("libro")
        fecha = datetime.strptime(comentario_json.get("fecha"), "%d-%m-%Y")
        descripcion = comentario_json.get("descripcion")
        return Comentario(
            idComentario=id,
            fk_idUser=usuario,
            fk_idLibro=libro,
            fecha=fecha,
            descripcion=descripcion
        )