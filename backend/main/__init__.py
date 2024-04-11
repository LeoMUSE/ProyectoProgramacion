from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import main.resources as resources  
import os

from flask_sqlalchemy import SQLAlchemy

api = Api()

#se inicializa SQL
db = SQLAlchemy()

#Inicializa la app , todos lo modulos y recursos
def create_app():
    app = Flask(__name__)
    load_dotenv() 
    
    #Si no existe el archivo de base de datos crearlo (solo válido si se utiliza SQLite)
    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    #Url de configuración de base de datos
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)

    api.add_resource(resources.LoginResource, '/login')
    api.add_resource(resources.SignInResource, '/signin')
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.LibroResource, '/libro/<id>')
    api.add_resource(resources.LibrosResourse, '/libros')
    api.add_resource(resources.PrestamoResourse, '/prestamo/<id>')
    api.add_resource(resources.PrestamosResourse, '/prestamos')
    api.add_resource(resources.ValoracionResourse, '/valoracion/<id>')
    api.add_resource(resources.ValoracionesResourse, '/valoraciones')
    api.add_resource(resources.ComentarioResource, '/comentario/<id>')
    api.add_resource(resources.ComentariosResource, '/comentarios')
    api.add_resource(resources.NotifacionResourse, '/notificacion')
    api.init_app(app)

    return app