from flask_restful import Resource
from flask import request, jsonify
from main.models import NotificacionModel
from .. import db

#NOTIFICACIONES = {
#    1:{'Usuario':'facu','Notifacion':'Quedan X dias de prestamo'},
#    2:{'Usuario':'elcapo', 'Notificacion':'Has prestado X libro'}
#}

class Notificacion(Resource):
    
    def post(self):
        notificacion = NotificacionModel.from_json(request.get_json())
        db.session.add(notificacion)
        db.session.commit()
        print(notificacion)
        return notificacion.to_json()


if __name__ == '__main__':
    pass