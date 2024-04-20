from .. import db
from datetime import datetime
from . import UsuarioModel, LibroModel

class Comentario(db.Model):
    idComentario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fk_idUser = db.Column(db.Integer, db.ForeignKey("usuario.idUser"), nullable=False)
    fk_user_comentario = db.relationship("Usuario", back_populates="comentarios_user", uselist=False, single_parent=True) #un usuario puede tener varios coemntarios, pero un comentario le pertenece solo a un usuario 1:n
    fk_idLibro =db.Column(db.Integer, db.ForeignKey("libro.idLibro"), nullable=False)
    fk_libro_comentario = db.relationship("Libro", back_populates="comentarios_libro", uselist=False, single_parent=True) #un libro puede tener varios comentarios, pero un comentario se relaciona unicamente con un libro 1:n
    fecha = db.Column(db.DateTime, nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<id: {self.idComentario}, Usuario: {self.fk_idUser}, Libro:{self.fk_idLibro}, Fecha: {self.fecha}, Descripcion: {self.descripcion}"

    def to_json(self):
        self.fk_user_comentario = db.session.query(UsuarioModel).get_or_404(self.fk_idUser)
        self.fk_libro_comentario = db.session.query(LibroModel).get_or_404(self.fk_idLibro)
        comentario_json = {
            "id" : int(self.idComentario),
            "usuario" : self.fk_user_comentario.to_json(),
            "libro" : self.fk_libro_comentario.to_json(),
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