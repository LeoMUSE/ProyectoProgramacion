from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import PrestamoModel, LibroModel, UsuarioModel
import regex
from datetime import datetime
from sqlalchemy import func, desc
from main.auth.decorators import role_required
from flask_jwt_extended import get_jwt_identity, get_jwt, jwt_required

#PRESTAMOS = {
#    1: {'usuario': 'usuario1', 'fechaI': '20/10/20', 'fechaT': '27/10/20' },
#    2: {'usuario': 'usuario2', 'fechaI': '21/10/20', 'fechaT': '28/10/20' },
#}

#implementar envio de mail

class Prestamo(Resource):
    
    @jwt_required()
    # solo el usuario puede ver los prestamos de uno mismo
    def get(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        return prestamo.to_json()

    @role_required(roles=["Admin", "Bibliotecario"])
    def put(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        data = request.get_json()

        nuevos_libros_ids = data.get('libro', [])
        nuevos_libros = [LibroModel.query.get_or_404(libro_id) for libro_id in nuevos_libros_ids]
        nuevo_user_id = data.get("usuario")
        nuevo_user = UsuarioModel.query.get_or_404(nuevo_user_id)

        for key, value in data.items():
            if key == 'libro':
                prestamo.fk_idLibro = nuevos_libros
            elif key == 'usuario':
                prestamo.fk_user_prestamo = nuevo_user
            elif regex.match(r"(0?[1-9]|[12][0-9]|3[01])(-)(0?[1-9]|1[012])\2(\d{4})", str(value)):
                setattr(prestamo, key.lower(), datetime.strptime(value, "%d-%m-%Y"))
            else:
                setattr(prestamo, key.lower(), value)

        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json(), 201
    
    @role_required(roles=["Admin"])
    def delete(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        db.session.delete(prestamo)
        db.session.commit()
        return '', 204

class Prestamos(Resource):
    
    @role_required(roles=["Admin"])
    def get(self):
        page = 1

        per_page = 10

        prestamos = db.session.query(PrestamoModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        ### FILTROS ###

        usuario = request.args.get('idUsuario')
        fecha_inicio = request.args.get('inicio_prestamo')
        fecha_termino = request.args.get('fin_prestamo')
        cant_libros = request.args.get('cant_libros')
        libro = request.args.get('libro_id')
        cant_prestamo = request.args.get("cant_prestamos")

        #usuario
        if usuario:
            prestamos = prestamos.filter(PrestamoModel.fk_idUser == usuario)

        #inicio_prestamo
        if fecha_inicio:
            fecha_inicio = datetime.strptime(fecha_inicio, '%d-%m-%Y')
            prestamos = prestamos.filter(PrestamoModel.inicio_prestamo == fecha_inicio)

        #fin_prestamo
        if fecha_termino:
            fecha_termino = datetime.strptime(fecha_termino, '%d-%m-%Y')
            prestamos = prestamos.filter(PrestamoModel.fin_prestamo == fecha_termino)
        
        #prestamos por cantidad de libros
        if cant_libros:
            prestamos=prestamos.outerjoin(PrestamoModel.fk_idLibro).group_by(PrestamoModel.idPrestamo).having(func.count(LibroModel.idLibro) == int(request.args.get("cant_libros")))

        #Prestamo por libro especifico
        if libro:
            libro_id = LibroModel.query.get_or_404(libro)
            prestamos=prestamos.filter(PrestamoModel.fk_idLibro.contains(libro_id))
        
        #Ordenar de manera desc los usuarios con mas prestamos a los menos (Fixing)
        if cant_prestamo == "Desc_Prestamos":
            prestamos==prestamos.outerjoin(PrestamoModel.fk_user_prestamo).group_by(UsuarioModel.idUser).order_by(func.count().desc()).all()
        

        ### FIN FILTROS ###
        
        prestamos = prestamos.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'prestamos' : [prestamo.to_json() for prestamo in prestamos],
                    'total' : prestamos.total,
                    'pages' : prestamos.pages,
                    'page' : page
        })

    @role_required(roles=["Admin"])
    def post(self):
        libro_exist = request.get_json().get("libro")
        prestamo = PrestamoModel.from_json(request.get_json())

        if libro_exist:
            libros = LibroModel.query.filter(LibroModel.idLibro.in_(libro_exist)).all()
            for libro in libros:
                prestamo.fk_idLibro.append(libro)

        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json()
    
if __name__ == '__main__':
    pass