from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import PrestamoModel



#PRESTAMOS = {
#    1: {'usuario': 'usuario1', 'fechaI': '20/10/20', 'fechaT': '27/10/20' },
#    2: {'usuario': 'usuario2', 'fechaI': '21/10/20', 'fechaT': '28/10/20' },
#}

class Prestamo(Resource):
    def get(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        return prestamo.to_json()

    def put(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(prestamo, key, value)
        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json() , 201


    def delete(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        db.session.delete(prestamo)
        db.session.commit()
        return '', 204

class Prestamos(Resource):
    def get(self):
        prestamos = db.session.query(PrestamoModel).all()
        return jsonify([prestamo.to_json() for prestamo in prestamos])

    def post(self):
        prestamo = PrestamoModel.from_json(request.get_json())
        db.session.add(prestamo)
        db.session.commit()
        print(prestamo)
        return prestamo.to_json()
    
if __name__ == '__main__':
    pass