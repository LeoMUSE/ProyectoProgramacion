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
            "Usuario" : int(self.fk_idUsuario),
            "Libro" : int(self.fk_idLibro),
            "Valoracion" : str(self.valoracion)
        }
    

    @staticmethod
    def from_json(valoracion_json):
        id = valoracion_json.get("id")
        usuario = valoracion_json.get("Usuario")
        libro = valoracion_json.get("Libro")
        valoracion = valoracion_json.get("Valoracion")
        return Valoracion(
            idValoracion=id,
            fk_idUsuario=usuario,
            fk_idLibro=libro,
            valoracion=valoracion
        )