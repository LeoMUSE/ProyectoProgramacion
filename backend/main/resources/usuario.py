from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from main.auth.decorators import role_required

#USUARIOS = {
#    1:{'Nombre':'Ricardo','Apellido':'Montes','DNI':44909938,'Telefono':2613123216, 'Email':'ricardito12@gmial.com', 'Rol':'Admin'},
#    2:{'Nombre':'Anibal','Apellido':'Perez','DNI':4312123,'Telefono':2610913127, 'Email': 'ani.capo@gmail.com', 'Rol':'Usuario'} ,
#    3:{'Nombre':'Celeste','Apellido':'Ramirez','DNI':42123190,'Telefono':2614123521, 'Email': 'celermz@gmial.com', 'Rol':'Usuario'},


class Usuario(Resource): #arreglado
    @jwt_required(optional=True)
    def get(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        current_identity = get_jwt_identity()
        if int(current_identity) != int(id):
            return usuario.to_json_short()
        else:
            return usuario.to_json()
    
    @jwt_required()
    def put(self, id): 
        #arreglado, Hacer algo con Admin, que pueda modificar cualquier usuario
        current_user_id = get_jwt_identity()
        if int(current_user_id) != int(id):
            return {'message': 'No tienes permiso para modificar este perfil'}, 403
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.commit()
        return usuario.to_json(), 201
    
    @role_required(roles = ["Admin", "Usuario"])
    def delete(self, id):
        #el usuario puede borrarse solo a sí mismo pero un borrado lógico
        #el admin o bibliotecario puede borrar a cualquier usuario
        current_user_id = get_jwt_identity()
        usuario = db.session.query(UsuarioModel).get_or_404(id)        
        if int(current_user_id) != int(usuario.idUser) and "Admin" not in get_jwt().get('roles', []):
            return {'message': 'No tiene permisos para borrar esta reseña'}, 403
        db.session.delete(usuario)
        db.session.commit()
        return '', 204 # status code 204, no debe tener respuesta

class Usuarios(Resource):
    
    @jwt_required(optional=True)
    def get(self):
        page = 1

        per_page = 10

        usuarios = db.session.query(UsuarioModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        ### FILTROS ###
        
        rol = request.args.get("rol")
        nombre = request.args.get("nombre")
        dni = request.args.get("dni")
        telefono = request.args.get("telefono")
        email = request.args.get("email")
        
        #usuarios por rol
        if rol:
            usuarios = usuarios.filter(UsuarioModel.rol.like("%"+rol+"%"))

        #usuarios por nombre
        if nombre:
            usuarios = usuarios.filter(UsuarioModel.nombre.like("%"+nombre+"%"))

        #usuarios por dni
        if dni:
            usuarios = usuarios.filter(UsuarioModel.dni.like("%"+dni+"%"))

        #usuarios por telefono (area)
        if telefono:
            usuarios = usuarios.filter(UsuarioModel.telefono.like("%"+telefono+"%"))

        #usuarios por email
        if email:
            usuarios = usuarios.filter(UsuarioModel.email.like("%"+email+"%"))

        ### FIN FILTROS ###

        # obtener valor paginado
        usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'usuarios': [usuario.to_json() for usuario in usuarios],
                    'total':usuarios.total,
                    'pages':usuarios.pages,
                    'page':page    
                        })

    def post(self):
        usuario = UsuarioModel.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        print(usuario)
        return usuario.to_json()
    
if __name__ == '__main__':
    pass