from flask_restful import Resource
from flask import request

LOGINS = {
    1:{'usuario':'admin','contraseña':'admin123'},
    2:{'usuario':'elcapo', 'contraseña':'hola1234'}
}

class Login(Resource):
    def post(self):
        login = request.get_json
        id = int(max(LOGINS.keys())) + 1
        LOGINS[id] = login
        return LOGINS[id], 201