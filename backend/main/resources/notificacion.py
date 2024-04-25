from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import NotificacionModel


#NOTIFICACIONES = {
#    1:{'Usuario':'facu','Notifacion':'Quedan X dias de prestamo'},
#    2:{'Usuario':'elcapo', 'Notificacion':'Has prestado X libro'}
#}

class Notificacion(Resource):
    def get(self):
        page = 1

        per_page = 10

        notificaciones = db.session.query(NotificacionModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        ### FILTROS ###

        #fecha

        #usuario/descripcion

        ### FIN FILTROS ###

        # obtener valor paginado
        notificaciones = notificaciones.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'notificaciones': [usuario.to_json() for usuario in notificaciones],
                    'total':notificaciones.total,
                    'pages':notificaciones.pages,
                    'page':page    
                        })

    
    def post(self):
        notificacion = NotificacionModel.from_json(request.get_json())
        db.session.add(notificacion)
        db.session.commit()
        print(notificacion)
        return notificacion.to_json()


if __name__ == '__main__':
    pass