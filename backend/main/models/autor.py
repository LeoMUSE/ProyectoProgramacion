from .. import db

class Autor(db.Model):
    idAutor = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(60), nullable=False)
    apellido = db.Column(db.String(60), nullable=False)
    apodo = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"<id: {self.idAutor}, Nombre: {self.nombre}, Apellido: {self.apellido}, Apodo: {self.apodo}>"
    
    def to_json(self):
        autor_json = {
            "id" : int(self.idAutor),
            "nombre" : str(self.nombre),
            "apellido" : str(self.apellido),
            "apodo" : str(self.apodo)
        }
        return autor_json
    
    @staticmethod
    def from_json(autor_json):
        id = autor_json.get("id")
        nombre = autor_json.get("nombre")
        apellido = autor_json.get("apellido")
        apodo = autor_json.get("apodo")
        return Autor(
            idAutor=id,
            nombre=nombre,
            apellido=apellido,
            apodo=apodo
        )