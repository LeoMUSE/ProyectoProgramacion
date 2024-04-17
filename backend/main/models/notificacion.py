from .. import db

class Notificacion(db.Model):
    idNotificacion = db.Column(db.Integer, primary_key=True)
    fk_idUser = db.Column(db.Integer, nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<id: {self.idNotificacion}, Usuario: {self.fk_idUser}, Descripcion: {self.descripcion}"
    
    def to_json(self):
        notificacion_json = {
            "id" : int(self.idNotificacion),
            "Usuario" : int(self.fk_idUser),
            "Descripcion" : str(self.descripcion) 
        }
        return notificacion_json
    
    @staticmethod
    def from_json(notificacion_json):
        id = notificacion_json.get("id")
        usuario = notificacion_json.get("Usuario")
        descripcion = notificacion_json.get("Descripcion")
        return Notificacion(
            idNotificacion=id,
            fk_idUser=usuario,
            descripcion=descripcion
        )