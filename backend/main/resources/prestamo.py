from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import PrestamoModel, LibroModel, UsuarioModel
import re
from datetime import datetime, timedelta
from sqlalchemy import func, desc
from main.auth.decorators import role_required
from flask_jwt_extended import get_jwt_identity, get_jwt, jwt_required

#PRESTAMOS = {
#    1: {'usuario': 'usuario1', 'fechaI': '20/10/20', 'fechaT': '27/10/20' },
#    2: {'usuario': 'usuario2', 'fechaI': '21/10/20', 'fechaT': '28/10/20' },
#}

#implementar envio de mail

class Prestamo(Resource):
    
    @role_required(roles=["Admin", "Usuario"])
    # solo el usuario puede ver los prestamos de uno mismo
    # el admin y bibliotecario puede ver cualquiera
    def get(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        return prestamo.to_json()

    @role_required(roles=["Admin"])
    def put(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        data = request.get_json()

        nuevos_libros_ids = data.get('libro')
        if nuevos_libros_ids:
            if not isinstance(nuevos_libros_ids, list):
                nuevos_libros_ids = [nuevos_libros_ids]
            
            nuevos_libros = [LibroModel.query.get_or_404(libro_id) for libro_id in nuevos_libros_ids]
            prestamo.fk_idLibro = nuevos_libros

        nuevo_user_id = data.get("usuario")
        if nuevo_user_id:
            nuevo_user = UsuarioModel.query.get_or_404(nuevo_user_id)
            prestamo.fk_user_prestamo = nuevo_user

        regex = re.compile(r"(0?[1-9]|[12][0-9]|3[01])(-)(0?[1-9]|1[012])\2(\d{4})")

        for key, value in data.items():
            if key == 'libro' or key == 'usuario':
                continue
            elif regex.match(str(value)):
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
    
    @role_required(roles=["Admin", "Usuario"])
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
        estado = request.args.get('estado')
        fecha_proxima = request.args.get('proximas_fechas')

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
            
        # Filtro por estado
        if estado:
            prestamos = prestamos.filter(PrestamoModel.estado.like("%"+estado+"%"))
            
        # Filtro por fechas próximas a terminar
        if fecha_proxima:  #ARREGLAR
            today = datetime.today()
            end_date = today + timedelta(days=int(fecha_proxima))
            
            # Filtrar los préstamos en el rango de fechas
            prestamos = prestamos.filter(PrestamoModel.fin_prestamo.between(today, end_date))
            
            # Ordenar los préstamos por fecha de terminación, de más próxima a más lejana
            prestamos = prestamos.order_by(PrestamoModel.fin_prestamo.asc())
        

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

        # Asegúrate de que libro_exist sea una lista
        if not isinstance(libro_exist, list):
            libro_exist = [libro_exist]

        # Verifica que los libros existan
        libros = LibroModel.query.filter(LibroModel.idLibro.in_(libro_exist)).all()
        if not libros:
            return {'message': 'Libro no encontrado'}, 404

        # Agrega los libros al préstamo
        for libro in libros:
            prestamo.fk_idLibro.append(libro)

        db.session.add(prestamo)
        db.session.commit()
        return prestamo.to_json()
    
if __name__ == '__main__':
    pass