from .. import db

class Libro(db.Model):
    idLibro = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String, nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    fk_idAutor = db.Column(db.Integer, nullable=False)
    editorial = db.Column(db.String(60), nullable=False)
    genero = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"<id: {self.idLibro}, Cantidad: {self.cantidad}, Autor: {self.fk_idAutor}, Editorial: {self.editorial}, Genero: {self.genero}>"

    def to_json(self):
        libro_json = {
            "id" : int(self.idLibro),
            "Titulo" : str(self.titulo),
            "Cantidad" : int(self.cantidad),
            "Autor" : int(self.fk_idAutor),
            "Editorial" : str(self.editorial),
            "Genero" : str(self.genero)
        }
        return libro_json
    
    @staticmethod
    def from_json(libro_json):
        id = libro_json.get("id")
        titulo = libro_json.get("Titulo")
        cantidad = libro_json.get("Cantidad")
        autor = libro_json.get("Autor")
        editorial = libro_json.get("Editorial")
        genero = libro_json.get("Genero")
        return Libro(
            idLibro=id,
            titulo=titulo,
            cantidad=cantidad,
            fk_idAutor=autor,
            editorial=editorial,
            genero=genero
        )
