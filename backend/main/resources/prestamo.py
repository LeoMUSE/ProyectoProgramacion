from flask_restful import Resource
from flask import request


PRESTAMOS = {
    1: {'usuario': 'usuario1', 'Inicio Prestamo': '10/5/2024', 'Fin Prestamo': '16/5/2024'},
    2: {'usuario': 'usuario2', 'Inicio Prestamo': '15/5/2024', 'Fin Prestamo': '21/5/2024'}
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
            return 'Eliminado Exitosamente', 204
        return 'Error', 404
    
    

class Prestamos(Resource):
    def get(self):
        return PRESTAMOS

    def post(self):
        nuevo_prestamo = request.get_json()
        id = int(max(PRESTAMOS.keys())) + 1
        PRESTAMOS[id] = nuevo_prestamo
        return PRESTAMOS[id], 201
    