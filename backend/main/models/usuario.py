from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

class Usuario(db.Model):
    __tablename__ = "usuarios"
    idUser = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(60), nullable=False)
    contraseña = db.Column(db.String(60), nullable=False)
    nombre = db.Column(db.String(60), nullable=False)
    apellido = db.Column(db.String(60), nullable=False)
    dni = db.Column(db.Integer, nullable=False)
    telefono = db.Column(db.String(14), nullable=False)
    email = db.Column(db.String(60),  unique=True, index=True, nullable=False)
    rol = db.Column(db.String(30), nullable=False, server_default = "Usuario")
    profile_img = db.Column(db.String(60))
    status = db.Column(db.Boolean, nullable=False, default=False)
    notificaciones_user = db.relationship("Notificacion", back_populates="fk_user_notificacion", cascade="all, delete-orphan")
    prestamos_user = db.relationship("Prestamo", back_populates="fk_user_prestamo", cascade="all, delete-orphan")
    reseñas_user = db.relationship("Reseña", back_populates="fk_user_reseña", cascade="all, delete-orphan")

    def __repr__(self):
        return (
            f"<id: {self.idUser}, User: {self.user}, Contraseña: {self.contraseña}, Nombre: {self.nombre},"
            + f"Apellido: {self.apellido}, DNI: {self.dni}, Telefono: {self.telefono}, Email: {self.email}, Rol: {self.rol}, Profile Img: {self.profile_img}>"
        )
    def to_json(self):
        usuario_json = {
            "id" : int(self.idUser),
            "user" : str(self.user),
            #"contraseña" : str(self.contraseña),
            "nombre" : str(self.nombre),
            "apellido" : str(self.apellido),
            "dni" : int(self.dni),
            "telefono" : str(self.telefono),
            "email" : str(self.email),
            "rol" : str(self.rol),
            "img" : str(self.profile_img), # ver como manejar las imagenes
            "status": str(self.status)
        }
        return usuario_json
    
    def to_json_short(self):
        usuario_json = {
            "id" : int(self.idUser),
            "user" : str(self.user),
            "nombre" : str(self.nombre),
            "apellido" : str(self.apellido)
        }
        return usuario_json
    
    @property
    def plain_password(self):
        raise AttributeError('Password cant be read')
    
    @plain_password.setter
    def plain_password(self, contraseña):
        self.contraseña = generate_password_hash(contraseña)
    
    def validate_pass(self, contraseña):
        return check_password_hash(self.contraseña, contraseña)
    
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
        img = usuario_json.get("img") #ver como manejar las imagenes
        status = usuario_json.get("status")
        return Usuario(
            idUser=id,
            user=user,
            plain_password=contraseña,
            nombre=nombre,
            apellido=apellido,
            dni=dni,
            telefono=telefono,
            email=email,
            rol=rol,
            profile_img=img,
            status=status
        )