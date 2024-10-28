from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ReseñaModel, UsuarioModel, LibroModel
import regex
from datetime import datetime
from sqlalchemy import func, desc, asc
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

#implementar envio de mail

class Reseña(Resource):
    @jwt_required(optional=True)
    def get(self, id):
        reseña = db.session.query(ReseñaModel).get_or_404(id)
        return reseña.to_json()
    
    @role_required(roles=["Usuario"])
    # el usuario se puede modificar, solo a si mismo
    def put(self, id):
        reseña = db.session.query(ReseñaModel).get_or_404(id)
        data = request.get_json()
        current_user_id = get_jwt_identity()
        if int(current_user_id) != reseña.fk_idUser:
            return {'message' : 'No tienes permiso para modificar la reseña de este usuario'}
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

    @role_required(roles=["Admin", "Usuario"])
    # el usuario puede borrar la reseña, solo a si mismo
    # el admin o bibliotecario puede borrar cualquiera
    def delete(self, id):
        current_user_id = get_jwt_identity()
        reseña = db.session.query(ReseñaModel).get_or_404(id)
        # Verificar permisos
        if int(current_user_id) != int(reseña.fk_idUser) and "Admin" not in get_jwt().get('roles', []):
            return {'message': 'No tiene permisos para borrar esta reseña'}, 403
        db.session.delete(reseña)
        db.session.commit()
        return '', 204

class Reseñas(Resource):
    
    @jwt_required(optional=True)
    def get(self):
        page = 1
        per_page = 10
        
        reseñas = db.session.query(ReseñaModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        ### FILTROS ###
        
        reseña_n_5 = request.args.get('nroValoracion')
        reseña_mas_menos = request.args.get('ordenValoracion')
        reseña_menos_mas = request.args.get('ordenValoracion')
        reseña_usuario = request.args.get('idUserPost')
        reseña_x_fecha = request.args.get('fechaReseña')
        reseña_libro = request.args.get('idLibro')

        #reseñas n/5
        if request.args.get("nroValoracion"):
            reseñas=reseñas.filter(ReseñaModel.valoracion.like("%"+reseña_n_5+"%"))

        #libro del más valorado al menos valorado 
        if reseña_mas_menos == 'Valoraciones_desc':
            reseñas=reseñas.order_by(desc(ReseñaModel.valoracion))
        if reseña_menos_mas == "Valoraciones_asc":
            reseñas=reseñas.order_by(asc(ReseñaModel.valoracion))
        #reseñas por usuario
        if reseña_usuario:
            reseñas=reseñas.filter(ReseñaModel.fk_idUser == reseña_usuario)
        #reseña por fecha
        if reseña_x_fecha:
            reseña_x_fecha = datetime.strptime(reseña_x_fecha, '%d-%m-%Y')
            reseñas=reseñas.filter(ReseñaModel.fecha == reseña_x_fecha)
        # Reseñas por libro
        if reseña_libro:
            reseñas = reseñas.filter(ReseñaModel.fk_idLibro == reseña_libro)


        ### FIN FILTROS ####
        
        reseñas = reseñas.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'reseñas': [reseña.to_json() for reseña in reseñas],
                'total': reseñas.total,
                'pages': reseñas.pages,
                'page': page
                })
        
    @role_required(roles=["Admin", "Usuario"])
    def post(self):
        reseña = ReseñaModel.from_json(request.get_json())
        db.session.add(reseña)
        db.session.commit()
        print(reseña)
        return reseña.to_json()
    
if __name__ == '__main__':
    pass