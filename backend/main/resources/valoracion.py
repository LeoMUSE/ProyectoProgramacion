from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ValoracionModel


# VALORACIONES = {
#    1:{'Usuario:':'MaritoRz', 'Libro':'Odisea','Valoración:':'1/5'},
#    2:{'Usuario:': 'PipeVC', 'Libro':'El Código Da Vinci','Valoracion': '3/5'},
#    3:{'Usuario:':'Facu81', 'Libro':'Don Quijote de la Mancha', 'Valoracion':'5/5'}
# }

class Valoracion(Resource):
    def get(self, id):
        valoracion = db.session.query(ValoracionModel).get_or_404(id)
        return valoracion.to_json()

    #modificar metodo PUT, para poder cambair relaciones
    def put(self, id):
        valoracion = db.session.query(ValoracionModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(valoracion, key, value)
        db.session.add(valoracion)
        db.session.commit()
        return valoracion.to_json() , 201


    def delete(self, id):
        valoracion = db.session.query(ValoracionModel).get_or_404(id)
        db.session.delete(valoracion)
        db.session.commit()
        return '', 204

class Valoraciones(Resource):
    def get(self):
        valoraciones = db.session.query(ValoracionModel).all()
        return jsonify([valoracion.to_json() for valoracion in valoraciones])

    def post(self):
        valoracion = ValoracionModel.from_json(request.get_json())
        db.session.add(valoracion)
        db.session.commit()
        print(valoracion)
        return valoracion.to_json()
    
if __name__ == '__main__':
    pass