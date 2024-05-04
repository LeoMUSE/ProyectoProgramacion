from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import AutorModel
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

class Autor(Resource):
    
    @jwt_required(optional=True)
    def get(self, id):
        autor = db.session.query(AutorModel).get_or_404(id)
        return autor.to_json()
    
    @role_required(roles=['Admin'])
    def put(self, id):
        autor = db.session.query(AutorModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(autor, key, value)
        db.session.add(autor)
        db.session.commit()
        return autor.to_json() , 201
    
    @role_required(roles=['Admin'])
    def delete(self, id):
        autor = db.session.query(AutorModel).get_or_404(id)
        db.session.delete(autor)
        db.session.commit()
        return '', 204

class Autores(Resource):

    @jwt_required(optional=True)
    def get(self):
        autores = db.session.query(AutorModel).all()
        return jsonify([autor.to_json() for autor in autores])

    @role_required(roles=["Admin"])
    def post(self):
        autor = AutorModel.from_json(request.get_json())
        db.session.add(autor)
        db.session.commit()
        print(autor)
        return autor.to_json()
    
if __name__ == '__main__':
    pass