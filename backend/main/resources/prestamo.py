from flask_restful import Resource
from flask import request


PRESTAMOS = {
    1: {'usuario': 'usuario1', 'monto': 1000},
    2: {'usuario': 'usuario2', 'monto': 2000}
}



class Prestamo(Resource):

    def get(self, id):
        if int(id) in PRESTAMOS:
            return PRESTAMOS[int(id)]
        return '', 404

    def put(self, id):
        if int(id) in PRESTAMOS:
            libro = PRESTAMOS[int(id)]
            data = request.get_json()
            libro.update(data)
            return '', 201
        return '', 404

    def delete(self, id):
        if int(id) in PRESTAMOS:
            del PRESTAMOS[int(id)]
            return '', 201
        return '', 404
    
    

class Prestamos(Resource):
    def get(self):
        return PRESTAMOS

    def post(self):
        nuevo_prestamo = request.get_json()
        id = int(max(PRESTAMOS.keys())) + 1
        PRESTAMOS[id] = nuevo_prestamo
        return PRESTAMOS[id], 201
    