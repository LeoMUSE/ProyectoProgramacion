from .. import db

libros_autores = db.Table("libros_autores",
    db.Column("id_autor",db.Integer,db.ForeignKey("autor.idAutor"), primary_key=True),
    db.Column("id_libro", db.Integer, db.ForeignKey("libro.idLibro"), primary_key=True)
)

class Libro(db.Model):
    idLibro = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String, nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    fk_idAutor = db.relationship("Autor", secondary=libros_autores, backref=db.backref('autores', lazy="dynamic"))
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
            "autor" : [autor.to_json() for autor in self.fk_idAutor],
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
            #fk_idAutor=autor, #no funciona m:n, ver
            editorial=editorial,
            genero=genero
        )
