from .. import db

class Valoracion(db.Model):
    idValoracion = db.Column(db.Integer, primary_key=True)
    fk_idUsuario = db.Column(db.Integer, nullable=False)
    fk_idLibro = db.Column(db.Integer, nullable=False)
    valoracion = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<id: {self.idValoracion}, Usuario: {self.fk_idLibro}, Libro: {self.fk_idLibro}, Valoracion: {self.fk_idUsuario}"
    
    def to_json(self):
        valoracion_json = {
            "id" : int(self.idValoracion),
            "usuario" : int(self.fk_idUsuario),
            "libro" : int(self.fk_idLibro),
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