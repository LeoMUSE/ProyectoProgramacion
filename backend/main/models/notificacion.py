from .. import db
from . import UsuarioModel

class Notificacion(db.Model):
    __tablename__ = "notificaciones"
    idNotificacion = db.Column(db.Integer, primary_key=True)
    fk_idUser = db.Column(db.Integer, db.ForeignKey("usuarios.idUser"), nullable=False)
    fk_user_notificacion = db.relationship("Usuario", back_populates="notificaciones_user", uselist=False, single_parent=True) #un usuario puede tener varias notificacions, pero una notificacion va a solo un usuario, 1:n
    descripcion = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<id: {self.idNotificacion}, Usuario: {self.fk_idUser}, Descripcion: {self.descripcion}"
    
    def to_json(self):
        self.fk_user_notificacion = db.session.query(UsuarioModel).get_or_404(self.fk_idUser)
        notificacion_json = {
            "id" : int(self.idNotificacion),
            "usuario" : self.fk_user_notificacion.to_json(),
            "descripcion" : str(self.descripcion) 
        }
        return notificacion_json
    
    @staticmethod
    def from_json(notificacion_json):
        id = notificacion_json.get("id")
        usuario = notificacion_json.get("usuario")
        descripcion = notificacion_json.get("descripcion")
        return Notificacion(
            idNotificacion=id,
            fk_idUser=usuario,
            descripcion=descripcion
        )
