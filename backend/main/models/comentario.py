from .. import db

class Comentario(db.Model):
    idComentario = db.Column(db.Integer, primary_key=True)
    fk_idUser = 0
    descripcion = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<id: {self.idComentario}, Usuario: {self.fk_idUser}, Descripcion: {self.descripcion}"
    
    def to_json(self):
        comentario_json = {
            "id" : int(self.idComentario),
            "Usuario" : str(self.fk_idUser),
            "Descripcion" : str(self.descripcion)
        }
        return comentario_json
    
    @staticmethod
    def from_json(comentario_json):
        id = comentario_json.get("id")
        usuario = comentario_json.get("Usuario")
        descripcion = comentario_json.get("Descripcion")
        return Comentario(
            id=id,
            usuario=usuario,
            descripcion=descripcion
        )

if __name__ == '__main__':
    pass