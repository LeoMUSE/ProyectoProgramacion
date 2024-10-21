from .. import db

libros_autores = db.Table("libros_autores",
    db.Column("id_autor",db.Integer,db.ForeignKey("autores.idAutor"), primary_key=True),
    db.Column("id_libro", db.Integer, db.ForeignKey("libros.idLibro"), primary_key=True)
)

class Libro(db.Model):
    __tablename__ = "libros"
    idLibro = db.Column(db.Integer, primary_key=True)
    book_img = db.Column(db.String, nullable=False)
    titulo = db.Column(db.String, nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    fk_idAutor = db.relationship("Autor", secondary=libros_autores, backref=db.backref('autores', lazy="dynamic"))
    editorial = db.Column(db.String(60), nullable=False)
    genero = db.Column(db.String(60), nullable=False)
    sinopsis = db.Column(db.String(300), nullable=False)
    #Agregar rating del libro 4/5, etc...
    reseñas_libro = db.relationship("Reseña", back_populates="fk_libro_reseña", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<id: {self.idLibro}, img: {self.book_img}, Titulo: {self.titulo}, Cantidad: {self.cantidad}, Autor: {self.fk_idAutor}, Editorial: {self.editorial}, Genero: {self.genero}, Sinopsis: {self.sinopsis}>"

    def to_json(self):
        libro_json = {
            "id" : int(self.idLibro),
            "img" : str(self.book_img),
            "titulo" : str(self.titulo),
            "cantidad" : int(self.cantidad),
            "autor" : [autor.to_json() for autor in self.fk_idAutor],
            "editorial" : str(self.editorial),
            "genero" : str(self.genero),
            "sinopsis" : str(self.sinopsis)
        }
        return libro_json
    
    def to_json_short(self):
        libro_json = {
            "id" : int(self.idLibro),
            "img" : str(self.book_img),
            "titulo" : str(self.titulo),
            "autor": [autor.to_json_short() for autor in self.fk_idAutor],
            "editorial" : str(self.editorial),
            "genero" : str(self.genero),
            "sinopsis" : str(self.sinopsis)
        }
        return libro_json
    
    @staticmethod
    def from_json(libro_json):
        id = libro_json.get("id")
        img = libro_json.get("img")
        titulo = libro_json.get("titulo")
        cantidad = libro_json.get("cantidad")
        editorial = libro_json.get("editorial")
        genero = libro_json.get("genero")
        sinopsis = libro_json.get("sinopsis")
        return Libro(
            idLibro=id,
            book_img=img,
            titulo=titulo,
            cantidad=cantidad,
            editorial=editorial,
            genero=genero,
            sinopsis=sinopsis
        )