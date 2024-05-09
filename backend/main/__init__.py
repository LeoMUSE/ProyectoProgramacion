import os
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail

api = Api()
#se inicializa SQL
db = SQLAlchemy()
#Inicializar JWT
jwt = JWTManager()

#Inicializa la app , todos lo modulos y recursos
def create_app():
    app = Flask(__name__)
    load_dotenv() 
    
    #Si no existe el archivo de base de datos crearlo (solo válido si se utiliza SQLite)
    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    #Uri de configuración de base de datos
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)

    import main.resources as resources
    api.add_resource(resources.LoginResource, '/login')
    api.add_resource(resources.SignInResource, '/signin')
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.LibroResource, '/libro/<id>')
    api.add_resource(resources.LibrosResource, '/libros')
    api.add_resource(resources.PrestamoResource, '/prestamo/<id>')
    api.add_resource(resources.PrestamosResource, '/prestamos')
    api.add_resource(resources.NotifacionResource, '/notificacion')
    api.add_resource(resources.AutorResource, '/autor/<id>')
    api.add_resource(resources.AutoresResource, '/autores')
    api.add_resource(resources.ReseñaResource, '/reseña/<id>')
    api.add_resource(resources.ReseñasResource, '/reseñas')
    api.init_app(app)
    #config jwt
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES"))
    jwt.init_app(app)
    #config mail
    
    

    from main.auth import routes
    app.register_blueprint(routes.auth)

    return app