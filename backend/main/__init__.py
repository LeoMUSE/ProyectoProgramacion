from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import main.resources as resources  

api = Api()

#Inicializa la app , todos lo modulos y recursos
def create_app():
    app = Flask(__name__)
    load_dotenv() 

    api.add_resource(resources.LoginResource, '/login')
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