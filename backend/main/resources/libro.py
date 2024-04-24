from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import LibroModel, AutorModel


#LIBROS = {
#    1:{'Titulo':'Odisea', 'Autor': 'Homero', 'Genero':'Poema epico', 'Editorial':'La Estacion'},
#    2:{'Titulo':'Don Quijote de la Mancha', 'Autor':'Miguel de Cervantes', 'Genero': 'Aventura', 'Editorial': 'Urbano Manini'},
#    3:{'Titulo':'El Código Da Vinci', 'Autor':'Dan Brown', 'Genero':'Novela Policiaca/Ficción', 'Editorial':'Doubleday'}
#}

class Libro(Resource):
    def get(self, id):
        libro = db.session.query(LibroModel).get_or_404(id)
        return libro.to_json()

    def put(self, id):
        libro = db.session.query(LibroModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(libro, key, value) #.lower() por probema de mayusculas, entre atributo y json
        db.session.add(libro)
        db.session.commit()
        return libro.to_json() , 201


    def delete(self, id):
        libro = db.session.query(LibroModel).get_or_404(id)
        db.session.delete(libro)
        db.session.commit()
        return '', 204

class Libros(Resource):
    def get(self):
        libros = db.session.query(LibroModel).all()
        return jsonify([libro.to_json() for libro in libros])
    
    def post(self):
        autor_exist = request.get_json().get("autor")
        libro = LibroModel.from_json(request.get_json())

        if autor_exist:
            autor_id = AutorModel.query.filter(AutorModel.idAutor.in_(autor_exist)).all()
            libro.fk_idAutor.extend(autor_id)
        
        db.session.add(libro)
        db.session.commit()
        return libro.to_json(), 201
    
if __name__ == '__main__':
    pass