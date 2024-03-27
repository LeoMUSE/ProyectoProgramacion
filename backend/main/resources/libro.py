from flask_restful import Resource
from flask import request

LIBROS = {
    1:{'Titulo':'Odisea', 'Autor': 'Homero', 'Genero':'Poema epico', 'Editorial':'La Estacion'},
    2:{'Titulo':'Don Quijote de la Mancha', 'Autor':'Miguel de Cervantes', 'Genero': 'Aventura', 'Editorial': 'Urbano Manini'},
    3:{'Titulo':'El Código Da Vinci', 'Autor':'Dan Brown', 'Genero':'Novela Policiaca/Ficción', 'Editorial':'Doubleday'}
}

class Libro(Resource):
    def get(self, id):
        if int(id) in LIBROS:
            return LIBROS[int(id)]
        return 'Error', 404

    def put(self, id):
        if int(id) in LIBROS:
            libro = LIBROS[int(id)]
            data = request.get_json()
            libro.update(data)
            return 'Modificado Exitosamente', 201
        return 'Error', 404

    def delete(self, id):
        if int(id) in LIBROS:
            del LIBROS[int(id)]
            return 'Eliminado Exitosamente', 204
        return 'Error', 404

class Libros(Resource):
    def get(self):
        return LIBROS

    def post(self):
        libro = request.get_json()
        id = int(max(LIBROS.keys())) + 1
        LIBROS[id] = libro
        return 'Añadido Exitosamente', 201