from flask_restful import Resource
from flask import request
from main.models import ValoracionModel
from .. import db

VALORACIONES = {
    1:{'Usuario:':'MaritoRz', 'Libro':'Odisea','Valoración:':'1/5'},
    2:{'Usuario:': 'PipeVC', 'Libro':'El Código Da Vinci','Valoracion': '3/5'},
    3:{'Usuario:':'Facu81', 'Libro':'Don Quijote de la Mancha', 'Valoracion':'5/5'}
}

class Valoracion(Resource):
    def get(self,id):
        valoracion = db.session.query(ValoracionModel).get_or_404(id)
        return valoracion.to_json()
        # if int(id) in VALORACIONES:
        #     return VALORACIONES[int(id)]
        # return '', 404
    
    def put(self,id):
        if int(id) in VALORACIONES:
            valo = VALORACIONES[int(id)]
            data = request.get_json()
            valo.update(data)
            return 'Modificado Exitosamente', 201
        return 'Error', 404
    
    def delete(self, id):
        if int(id) in VALORACIONES:
            del VALORACIONES[int(id)]
            return 'Eliminado Exitosamente', 204
        return 'Error', 404

class Valoraciones(Resource):
    def get(self):
        return VALORACIONES
    
    def post(self):
        valo = request.get_json()
        id = int(max(VALORACIONES.keys())) + 1
        VALORACIONES[id] = valo
        return VALORACIONES[id], 201