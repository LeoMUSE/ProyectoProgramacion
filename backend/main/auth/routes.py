from flask import request, jsonify, Blueprint
from .. import db
from main.models import UsuarioModel
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from main.mail.functions import sendMail

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/login', methods=['POST'])
def login():
    #Busca al usuario en la db por mail
    user = db.session.query(UsuarioModel).filter(UsuarioModel.email == request.get_json().get("email")).first_or_404()
    #Valida la contraseña
    if user.validate_pass(request.get_json().get("contraseña")):
        #Genera un nuevo token
        #Pasa el objeto user como identidad
        access_token = create_access_token(identity=user)
        #Devolver valores y token
        data = {
            'id': str(user.idUser),
            'email': user.email,
            'access_token': access_token
        }
        return data, 200
    else:
        return 'Incorrect password', 401
    
#implementar envio de mail

@auth.route('/register', methods=['POST'])
def register():
    #Obtener usuario
    user = UsuarioModel.from_json(request.get_json())
    #Verificar si el mail ya existe en la db, scalar() para saber la cantidad de ese email
    exists = db.session.query(UsuarioModel).filter(UsuarioModel.email == user.email).scalar() is not None
    if exists:
        return 'Duplicated mail', 409
    else:
        try:
            #Agregar usuario a DB
            db.session.add(user)
            db.session.commit()
            sent = sendMail([user.email],"Wellcome!","register", user = user)
        except Exception as error:
            db.session.rollback()
            return str(error), 409
        return user.to_json() , 201