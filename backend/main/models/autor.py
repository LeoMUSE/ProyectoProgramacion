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
            "Nombre" : str(self.nombre),
            "Apellido" : str(self.apellido),
            "Apodo" : str(self.apodo)
        }
        return autor_json
    
    @staticmethod
    def from_json(autor_json):
        id = autor_json.get("id")
        nombre = autor_json.get("Nombre")
        apellido = autor_json.get("Apellido")
        apodo = autor_json.get("Apodo")
        return Autor(
            idAutor=id,
            nombre=nombre,
            apellido=apellido,
            apodo=apodo
        )