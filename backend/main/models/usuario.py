from .. import db

class Usuario(db.Model):
    __tablename__ = "usuarios"
    idUser = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(60), nullable=False)
    contraseña = db.Column(db.String(60), nullable=False)
    nombre = db.Column(db.String(60), nullable=False)
    apellido = db.Column(db.String(60), nullable=False)
    dni = db.Column(db.Integer, nullable=False)
    telefono = db.Column(db.String(14), nullable=False)
    email = db.Column(db.String(60), nullable=False)
    rol = db.Column(db.String(30), nullable=False)
    comentarios_user = db.relationship("Comentario", back_populates="fk_user_comentario", cascade="all, delete-orphan")
    notificaciones_user = db.relationship("Notificacion", back_populates="fk_user_notificacion", cascade="all, delete-orphan")
    prestamos_user = db.relationship("Prestamo", back_populates="fk_user_prestamo", cascade="all, delete-orphan")
    valoraciones_user = db.relationship("Valoracion", back_populates="fk_user_valoracion", cascade="all, delete-orphan")

    def __repr__(self):
        return (
            f"<id: {self.idUser}, User: {self.user}, Contraseña: {self.contraseña}, Nombre: {self.nombre},"
            + f"Apellido: {self.apellido}, DNI: {self.dni}, Telefono: {self.telefono}, Email: {self.email}, Rol: {self.rol}>"
        )
    def to_json(self):
        usuario_json = {
            "id" : int(self.idUser),
            "user" : str(self.user),
            "contraseña" : str(self.contraseña),
            "nombre" : str(self.nombre),
            "apellido" : str(self.apellido),
            "dni" : int(self.dni),
            "telefono" : str(self.telefono),
            "email" : str(self.email),
            "rol" : str(self.rol)
        }
        return usuario_json
    
    @staticmethod
    def from_json(usuario_json):
        id = usuario_json.get("id")
        user = usuario_json.get("user")
        contraseña = usuario_json.get("contraseña")
        nombre = usuario_json.get("nombre")
        apellido = usuario_json.get("apellido")
        dni = usuario_json.get("dni")
        telefono = usuario_json.get("telefono")
        email = usuario_json.get("email")
        rol = usuario_json.get("rol")   
        return Usuario(
            idUser=id,
            user=user,
            contraseña=contraseña,
            nombre=nombre,
            apellido=apellido,
            dni=dni,
            telefono=telefono,
            email=email,
            rol=rol
        )