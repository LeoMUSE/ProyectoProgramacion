from .. import db

class Libro(db.Model):
    idLibro = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String, nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    fk_idAutor = db.Column(db.Integer, nullable=False) #un libro solo tiene un autor, pero los autores pueden tener varios libros, 1:n
    editorial = db.Column(db.String(60), nullable=False)
    genero = db.Column(db.String(60), nullable=False)
    comentarios_libro = db.relationship("Comentario", back_populates="fk_libro_comentario", cascade="all, delete-orphan")
    valoraciones_libro = db.relationship("Valoracion", back_populates="fk_libro_valoracion", cascade= "all, delete-orphan")

    def __repr__(self):
        return f"<id: {self.idLibro},Titulo: {self.titulo} Cantidad: {self.cantidad}, Autor: {self.fk_idAutor}, Editorial: {self.editorial}, Genero: {self.genero}>"

    def to_json(self):
        libro_json = {
            "id" : int(self.idLibro),
            "titulo" : str(self.titulo),
            "cantidad" : int(self.cantidad),
            "autor" : int(self.fk_idAutor),
            "editorial" : str(self.editorial),
            "genero" : str(self.genero)
        }
        return libro_json
    
    @staticmethod
    def from_json(libro_json):
        id = libro_json.get("id")
        titulo = libro_json.get("titulo")
        cantidad = libro_json.get("cantidad")
        autor = libro_json.get("autor")
        editorial = libro_json.get("editorial")
        genero = libro_json.get("genero")
        return Libro(
            idLibro=id,
            titulo=titulo,
            cantidad=cantidad,
            fk_idAutor=autor,
            editorial=editorial,
            genero=genero
        )
