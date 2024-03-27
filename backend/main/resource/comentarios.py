from flask_restful import Resource
from flask import request

COMENTARIO = {
    1 : {'Fecha':'21/08/24', 'Usuario':'Leandro Flores', 'Mensaje':'Un libro muy entretenido'},
    2 : {'Fecha':'25/08/24', 'Usuario':'Carlos Maidana', 'Mensaje':'Uno de los mejores en su genero'},
    3 : {'Fecha':'27/08/24', 'Usuario':'Paola Argento', 'Mensaje':'Un poco pesado al principio pero despues se pone bueno'},
}

class Comentario(Resource):
    def get(self, id):
        if int(id) in COMENTARIO:
            return COMENTARIO[int(id)]
        return 'Error', 404

    def put(self, id):
        if int(id) in COMENTARIO:
            libro = COMENTARIO[int(id)]
            data = request.get_json()
            libro.update(data)
            return 'Modificado Exitosamente', 201
        return 'Error', 404

    def delete(self, id):
        if int(id) in COMENTARIO:
            del COMENTARIO[int(id)]
            return 'Eliminado', 201
        return 'Error', 404

class Comentarios(Resource):
    def get():
        return COMENTARIO

    def post(self):
        libro = request.get_json()
        id = int(max(COMENTARIO.keys())) + 1
        COMENTARIO[id] = libro
        return 'Añadido Exitosamente', 201
    
if __name__ == '__main__':
    pass