from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel



#USUARIOS = {
#    1:{'Nombre':'Ricardo','Apellido':'Montes','DNI':44909938,'Telefono':2613123216, 'Email':'ricardito12@gmial.com', 'Rol':'Admin'},
#    2:{'Nombre':'Anibal','Apellido':'Perez','DNI':4312123,'Telefono':2610913127, 'Email': 'ani.capo@gmail.com', 'Rol':'Usuario'} ,
#    3:{'Nombre':'Celeste','Apellido':'Ramirez','DNI':42123190,'Telefono':2614123521, 'Email': 'celermz@gmial.com', 'Rol':'Usuario'},
#}

class Usuario(Resource):
    def get(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        return usuario.to_json()

    def put(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key.lower(), value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json() , 201


    def delete(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return '', 204

class Usuarios(Resource):
    def get(self):
        usuarios = db.session.query(UsuarioModel).all()
        return jsonify([usuario.to_json() for usuario in usuarios])

    def post(self):
        usuario = UsuarioModel.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        print(usuario)
        return usuario.to_json()
    
if __name__ == '__main__':
    pass