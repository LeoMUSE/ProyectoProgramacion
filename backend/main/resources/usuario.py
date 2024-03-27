from flask_restful import Resource
from flask import request

USUARIOS = {
    1:{'Nombre':'Ricardo','Apellido':'Montes','DNI':44909938,'Telefono':2613123216, 'Email':'ricardito12@gmial.com', 'Rol':'Admin'},
    2:{'Nombre':'Anibal','Apellido':'Perez','DNI':4312123,'Telefono':2610913127, 'Email': 'ani.capo@gmail.com', 'Rol':'Usuario'} ,
    3:{'Nombre':'Celeste','Apellido':'Ramirez','DNI':42123190,'Telefono':2614123521, 'Email': 'celermz@gmial.com', 'Rol':'Usuario'},
}

class Usuario(Resource):
    def get(self, id):
        if int(id) in USUARIOS:
            return USUARIOS[int(id)]
        return 'Error', 404
    
    def put(self, id):
        if int(id) in USUARIOS:
            user = USUARIOS[int(id)]
            data = request.get_json()
            user.update(data)
            return 'Modificado Exitosamente', 201
        return 'Error', 404
    
    def delete(self, id):
        if int(id) in USUARIOS:
            del USUARIOS[int(id)]
            return 'Eliminado Exitosamente', 204
        return 'Error', 404

class Usuarios(Resource):
    def get(self):
        return USUARIOS
    
    def post(self):
        user = request.get_json()
        id = int(max(USUARIOS.keys())) + 1
        USUARIOS[id] = user
        return USUARIOS[id], 201