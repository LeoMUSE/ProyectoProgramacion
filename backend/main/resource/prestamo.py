from flask_restful import Resource
from flask import request


PRESTAMOS = {
    1: {'usuario': 'usuario1', 'fechaI': '20/10/20', 'fechaT': '27/10/20' },
    2: {'usuario': 'usuario2', 'fechaI': '21/10/20', 'fechaT': '28/10/20' },
}

class Prestamo(Resource):

    def get(self, id):
        if int(id) in PRESTAMOS:
            return PRESTAMOS[int(id)]
        return 'Error', 404

    def put(self, id):
        if int(id) in PRESTAMOS:
            libro = PRESTAMOS[int(id)]
            data = request.get_json()
            libro.update(data)
            return 'Modificado Exitosamente', 201
        return 'Error', 404

    def delete(self, id):
        if int(id) in PRESTAMOS:
            del PRESTAMOS[int(id)]
            return 'Eliminado Exitosamente', 201
        return 'Error', 404
    
class Prestamos(Resource):
    def get(self):
        return PRESTAMOS

    def post(self):
        nuevo_prestamo = request.get_json()
        id = int(max(PRESTAMOS.keys())) + 1
        PRESTAMOS[id] = nuevo_prestamo
        return PRESTAMOS[id], 201
   
if __name__ == '__main__':
    pass