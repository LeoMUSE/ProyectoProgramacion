from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import LibroModel, AutorModel
from sqlalchemy import func, desc
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required

#LIBROS = {
#    1:{'Titulo':'Odisea', 'Autor': 'Homero', 'Genero':'Poema epico', 'Editorial':'La Estacion'},
#    2:{'Titulo':'Don Quijote de la Mancha', 'Autor':'Miguel de Cervantes', 'Genero': 'Aventura', 'Editorial': 'Urbano Manini'},
#    3:{'Titulo':'El Código Da Vinci', 'Autor':'Dan Brown', 'Genero':'Novela Policiaca/Ficción', 'Editorial':'Doubleday'}
#}

class Libro(Resource):
    
    @jwt_required(optional=True)
    def get(self, id):
        libro = db.session.query(LibroModel).get_or_404(id)
        return libro.to_json()
    
    @role_required(roles=["Admin"])
    def put(self, id):
        libro = db.session.query(LibroModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            if key == 'autor':
                nuevo_autor_id = value
                nuevo_autor = AutorModel.query.get_or_404(nuevo_autor_id)
                libro.fk_idAutor = [nuevo_autor]
            else:
                setattr(libro, key, value)
        db.session.add(libro)
        db.session.commit()
        return libro.to_json() , 201

    @role_required(roles=["Admin"])
    def delete(self, id):
        libro = db.session.query(LibroModel).get_or_404(id)
        db.session.delete(libro)
        db.session.commit()
        return '', 204

class Libros(Resource):
    @jwt_required(optional=True)
    def get(self):
        page = 1
        per_page = 10

        libros = db.session.query(LibroModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        ### FILTROS ###
        genero = request.args.get("genero")
        autor = request.args.get("autor")
        titulo = request.args.get("titulo")
        editorial = request.args.get("editorial")
        
        
        #genero
        if genero:
            libros=libros.filter(LibroModel.genero.like("%"+genero+"%"))
        
        #autor 
        if autor:
            autor_id = AutorModel.query.get_or_404(autor)
            libros=libros.filter(LibroModel.fk_idAutor.contains(autor_id))

        #titulo
        if titulo:
            libros = libros.filter(LibroModel.titulo.like("%"+titulo+"%"))

        #editorial
        if editorial:
            libros = libros.filter(LibroModel.editorial.like("%"+editorial+"%"))


        ### FIN FILTROS ###

        libros = libros.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'libros' : [libro.to_json() for libro in libros],
                    'total' : libros.total,
                    'pages' : libros.pages,
                    'page' : page
        })
    
    @role_required(roles=["Admin"])
    def post(self):
        autor_exist = request.get_json().get("autor")
        libro = LibroModel.from_json(request.get_json())

        if autor_exist:
            autor_id = AutorModel.query.filter(AutorModel.idAutor.in_(autor_exist)).all()
            libro.fk_idAutor.extend(autor_id)
        
        db.session.add(libro)
        db.session.commit()
        return libro.to_json(), 201
    
if __name__ == '__main__':
    pass