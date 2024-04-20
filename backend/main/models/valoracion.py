from .. import db
from . import UsuarioModel, LibroModel

class Valoracion(db.Model):
    idValoracion = db.Column(db.Integer, primary_key=True)
    fk_idUser = db.Column(db.Integer, db.ForeingKey("usuario.idUser"), nullable=False) #un usuario puede tener varias valoraciones, pero estas valoraciones le perteneces solo a un usuarios, 1:n
    fk_user_valoracion = db.relationship("Usuario", back_populates="valoraciones_user", uselist=False, single_parent=True)
    fk_idLibro = db.Column(db.Integer, db.ForeingKey("libro.idLibro"), nullable=False) #1:n
    fk_libro_valoracion = db.relationship("Libro", back_populates="valoraciones_libro", uselist=False, single_parent=True)
    valoracion = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<id: {self.idValoracion}, Usuario: {self.fk_idLibro}, Libro: {self.fk_idLibro}, Valoracion: {self.fk_idUsuario}"
    
    def to_json(self):
        self.fk_user_valoracion = db.session.query(UsuarioModel).get_or_404(self.fk_idUser)
        self.fk_libro_valoracion = db.session.query(LibroModel).get_or_404(self.fk_idLibro)
        valoracion_json = {
            "id" : int(self.idValoracion),
            "usuario" : self.fk_user_valoracion.to_json(),
            "libro" : self.fk_libro_valoracion.to_json(),
            "valoracion" : str(self.valoracion)
        }
        return valoracion_json
    
    @staticmethod
    def from_json(valoracion_json):
        id = valoracion_json.get("id")
        usuario = valoracion_json.get("usuario")
        libro = valoracion_json.get("libro")
        valoracion = valoracion_json.get("valoracion")
        return Valoracion(
            idValoracion=id,
            fk_idUsuario=usuario,
            fk_idLibro=libro,
            valoracion=valoracion
        )