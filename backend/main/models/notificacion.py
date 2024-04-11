from .. import db

class Notificacion(db.Model):
    idNotificacion = db.Column(db.Integer, primary_key=True)
    fk_idUsuario = db.Column(db.String(60), nullable=False)
    descripcion = db.Column(db.String(255), nillable=False)

    def __repr__(self):
        return f"<id: {self.idNotificacion}, Usuario: {self.fk_idUsuario}, Descripcion: {self.descripcion}"
    
    def to_json(self):
        notificacion_json = {
            "id" : int(self.idNotificacion),
            "Usuario" : str(self.fk_idUsuario),
            "Descripcion" : str(self.descripcion) 
        }
        return notificacion_json
    
    @staticmethod
    def from_json(notificacion_json):
        id = notificacion_json.get("id")
        usuario = notificacion_json.get("Usuario")
        descripcion = notificacion_json.get("descripcion")
        return Notificacion(
            id=id,
            usuario=usuario,
            descripcion=descripcion
        )
    
if __name__ == '__main__':
    pass