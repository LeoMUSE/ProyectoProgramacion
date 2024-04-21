from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ComentarioModel
import regex
from datetime import datetime

#COMENTARIO = {
#    1 : {'Fecha':'21/08/24', 'Usuario':'Leandro Flores', 'Mensaje':'Un libro muy entretenido'},
#    2 : {'Fecha':'25/08/24', 'Usuario':'Carlos Maidana', 'Mensaje':'Uno de los mejores en su genero'},
#    3 : {'Fecha':'27/08/24', 'Usuario':'Paola Argento', 'Mensaje':'Un poco pesado al principio pero despues se pone bueno'},
#}

class Comentario(Resource):
    def get(self, id):
        comentario = db.session.query(ComentarioModel).get_or_404(id)
        return comentario.to_json()

    def put(self, id):
        comentario = db.session.query(ComentarioModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            if regex.match(r"(0?[1-9]|[12][0-9]|3[01])(-)(0?[1-9]|1[012])\2(\d{4})", str(value)) != None: #expresión regular para fechas tipo dd-mm-aaaa
                setattr(comentario, key.lower(), datetime.strptime(value, "%d-%m-%Y"))
            else: setattr(comentario, key.lower(), value)
        db.session.add(comentario)
        db.session.commit()
        return comentario.to_json() , 201


    def delete(self, id):
        comentario = db.session.query(ComentarioModel).get_or_404(id)
        db.session.delete(comentario)
        db.session.commit()
        return '', 204

class Comentarios(Resource):
    def get(self):
        comentarios = db.session.query(ComentarioModel).all()
        return jsonify([comentario.to_json() for comentario in comentarios])

    def post(self):
        comentario = ComentarioModel.from_json(request.get_json())
        db.session.add(comentario)
        db.session.commit()
        print(comentario)
        return comentario.to_json()
    
if __name__ == '__main__':
    pass