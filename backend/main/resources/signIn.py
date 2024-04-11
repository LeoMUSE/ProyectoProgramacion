from flask_restful import Resource
from flask import request

SIGNIN = {
    1: {'usuario': 'usuario1', 'contraseña': 'contraseña1'},
    2: {'usuario': 'usuario2', 'contraseña': 'contraseña2'}
}

class SignIn(Resource):

    def post(self):
        singIn = request.get_json()
        id = int(max(SIGNIN.keys()))+1
        SIGNIN[id] = singIn
        return SIGNIN[id], 201
    
if __name__ == '__main__':
    pass