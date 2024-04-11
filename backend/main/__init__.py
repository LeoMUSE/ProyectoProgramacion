from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import main.resource as resources 
from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy() 

api = Api()

#Inicializa la app , todos lo modulos y recursos
def create_app():
    app = Flask(__name__)
    load_dotenv() 

    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////' + os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)

    api.add_resource(resources.LoginResource, '/login')
    api.add_resource(resources.SignInResource, '/SignIn')
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.LibroResource, '/libro/<id>')
    api.add_resource(resources.LibrosResourse, '/libros')
    api.add_resource(resources.PrestamoResourse, '/prestamo/<id>')
    api.add_resource(resources.PrestamosResourse, '/prestamos')
    api.add_resource(resources.ComentarioResource, '/comentario/<id>')
    api.add_resource(resources.ComentariosResource, '/comentarios')
    api.add_resource(resources.ValoracionResourse, '/valoracion/<id>')
    api.add_resource(resources.ValoracionesResourse, '/valoraciones')
    api.add_resource(resources.NotifacionResourse, '/notificacion')

    api.init_app(app)

    return app