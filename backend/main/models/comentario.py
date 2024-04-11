from .. import db

class Comentario(db.Model):
    idComentario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fk_idUser = 0
    descripcion = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f""