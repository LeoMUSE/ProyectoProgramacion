from flask_restful import Resource
from flask import request

NOTIFICACIONES = {
    1:{'Usuario':'facu','Notificacion':'Quedan X dias de prestamo'},
    2:{'Usuario':'elcapo', 'Notificacion':'Has prestado X libro'}
}

class Notificacion(Resource):
    
    def post(self):
        notificacion = request.get_json()
        id = int(max(NOTIFICACIONES.keys())) + 1
        NOTIFICACIONES[id] = notificacion
        return NOTIFICACIONES[id], 201