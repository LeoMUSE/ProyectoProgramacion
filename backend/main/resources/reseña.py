from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ReseñaModel, UsuarioModel, LibroModel
import regex
from datetime import datetime
from sqlalchemy import func, desc, asc

class Reseña(Resource):
    def get(self, id):
        reseña = db.session.query(ReseñaModel).get_or_404(id)
        return reseña.to_json()
    
    def put(self, id):
        reseña = db.session.query(ReseñaModel).get_or_404(id)
        data = request.get_json()

        nuevo_usuario_id = data.get('usuario')
        if nuevo_usuario_id:
            nuevo_usuario = UsuarioModel.query.get_or_404(nuevo_usuario_id)
            reseña.fk_user_reseña = nuevo_usuario
        nuevo_libro_id = data.get('libro')
        if nuevo_libro_id:
            nuevo_libro = LibroModel.query.get_or_404(nuevo_libro_id)
            reseña.fk_libro_reseña = nuevo_libro

        for key, value in data.items():
            if key not in ['usuario', 'libro']:
                if regex.match(r"(0?[1-9]|[12][0-9]|3[01])(-)(0?[1-9]|1[012])\2(\d{4})", str(value)):
                    setattr(reseña, key, datetime.strptime(value, "%d-%m-%Y"))
                else:
                    setattr(reseña, key, value)

        db.session.add(reseña)
        db.session.commit()
        return reseña.to_json(), 201

    def delete(self, id):
        reseña = db.session.query(ReseñaModel).get_or_404(id)
        db.session.delete( reseña)
        db.session.commit()
        return '', 204

class Reseñas(Resource):
    def get(self):
        page = 1
        per_page = 10
        
        reseñas = db.session.query(ReseñaModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        ### FILTROS ###

        #reseñas n/5
        if request.args.get("nroValoracion"):
            reseñas=reseñas.filter(ReseñaModel.valoracion.like("%"+request.args.get('nroValoracion')+"%"))

        #libro del más valorado al menos valorado 
        if request.args.get('ordenValoracion') == 'Valoraciones_desc':
            reseñas=reseñas.order_by(desc(ReseñaModel.valoracion))
        elif request.args.get('ordenValoracion') == "Valoraciones_asc":
            reseñas=reseñas.order_by(asc(ReseñaModel.valoracion))
        # else: FIX
        #     raise BusquedaIncorrecta("Argumento Incorrecto") #Arreglar sin body html
        

        ### FIN FILTROS ####
        
        reseñas = reseñas.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'reseñas': [reseña.to_json() for reseña in reseñas],
                'total': reseñas.total,
                'pages': reseñas.pages,
                'page': page
                })
    
    def post(self):
        reseña = ReseñaModel.from_json(request.get_json())
        db.session.add(reseña)
        db.session.commit()
        print(reseña)
        return reseña.to_json()
    
if __name__ == '__main__':
    pass