from .. import db

class Usuario(db.Model):
    idUser = db.Column(db.Integer(4), primary_key=True)
    user = db.Column(db.String(60), nullable=False)
    contraseña = db.Column(db.String(60), nullable=False)
    nombre = db.Column(db.String(60), nullable=False)
    apellido = db.Column(db.String(60), nullable=False)
    dni = db.Column(db.Integer(8), nullable=False)
    telefono = db.Column(db.String(14), nullable=False)
    email = db.Column(db.String(60), nullable=False)
    rol = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        return (
            f"<id: {self.idUser}, User: {self.user}, Contraseña: {self.contraseña}, Nombre: {self.nombre},"
            + f"Apellido: {self.apellido}, DNI: {self.dni}, Telefono: {self.telefono}, Email: {self.email}, Rol: {self.rol}>"
        )
    def to_json(self):
        usuario_json = {
            "id" : int(self.idUser),
            "User" : str(self.user),
            "Contraseña" : str(self.contraseña),
            "Nombre" : str(self.nombre),
            "Apellido" : str(self.apellido),
            "DNI" : int(self.dni),
            "Telefono" : str(self.telefono),
            "Email" : str(self.email),
            "Rol" : str(self.rol)
        }
        return usuario_json
    
    @staticmethod
    def from_json(usuario_json):
        id = usuario_json.get("id")
        user = usuario_json.get("User")
        contraseña = usuario_json.get("Contraseña")
        nombre = usuario_json.get("Nombre")
        apellido = usuario_json.get("Apellido")
        dni = usuario_json.get("DNI")
        telefono = usuario_json.get("Telefono")
        email = usuario_json.get("Email")
        rol = usuario_json.get("Rol")   
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
    
if __name__ == '__main__':
    pass