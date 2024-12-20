from .. import db
from datetime import datetime
from . import UsuarioModel

prestamos_libros = db.Table("prestamos_libros", 
    db.Column("id_libro", db.Integer, db.ForeignKey("libros.idLibro"), primary_key=True),
    db.Column("id_prestamo", db.Integer, db.ForeignKey("prestamos.idPrestamo"), primary_key=True)
)

class Prestamo(db.Model):
    __tablename__ = "prestamos"
    idPrestamo = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fk_idUser = db.Column(db.Integer, db.ForeignKey("usuarios.idUser"), nullable=False)
    fk_user_prestamo = db.relationship("Usuario", back_populates="prestamos_user", uselist=False, single_parent=True) #un usuario puede tener varios prestamos, pero el prestamo le pertenece solo a un usuario, 1:n
    fk_idLibro= db.relationship("Libro", secondary=prestamos_libros, backref=db.backref("prestamos", lazy="dynamic")) #un libro tiene varios prestaos y los prestamos pueden tener varios libros n:m
    inicio_prestamo = db.Column(db.DateTime, nullable=False)
    fin_prestamo = db.Column(db.DateTime, nullable=False)
    estado = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<id: {self.idPrestamo}, Usuario: {self.fk_idUser}, Libro: {self.fk_idLibro}, Inicio_Prestamo: {self.inicio_prestamo}, Fin_Prestamo: {self.fin_prestamo}, Estado: {self.estado}"
    
    def to_json(self):
        self.fk_user_prestamo = db.session.query(UsuarioModel).get_or_404(self.fk_idUser)
        prestamo_json = {
            "id" : int(self.idPrestamo),
            "usuario" : self.fk_user_prestamo.to_json(),
            "libro" : [libro.to_json() for libro in self.fk_idLibro],
            "inicio_prestamo" : str(self.inicio_prestamo.strftime("%d-%m-%Y")),
            "fin_prestamo" : str(self.fin_prestamo.strftime("%d-%m-%Y")),
            "estado" : str(self.estado)
        }
        return prestamo_json
    
    @staticmethod
    def from_json(prestamo_json):
        id = prestamo_json.get("id")
        usuario = prestamo_json.get("usuario")
        inicio_prestamo = datetime.strptime(prestamo_json.get("inicio_prestamo"), "%d-%m-%Y")
        fin_prestamo = datetime.strptime(prestamo_json.get("fin_prestamo"), "%d-%m-%Y") 
        estado = prestamo_json.get("estado")
        return Prestamo(
            idPrestamo=id,
            fk_idUser=usuario,
            inicio_prestamo=inicio_prestamo,
            fin_prestamo=fin_prestamo,
            estado=estado
        )