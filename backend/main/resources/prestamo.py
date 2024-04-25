from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import PrestamoModel, LibroModel, UsuarioModel
import regex
from datetime import datetime



#PRESTAMOS = {
#    1: {'usuario': 'usuario1', 'fechaI': '20/10/20', 'fechaT': '27/10/20' },
#    2: {'usuario': 'usuario2', 'fechaI': '21/10/20', 'fechaT': '28/10/20' },
#}

class Prestamo(Resource):
    def get(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        return prestamo.to_json()

    #modificar metodo PUT, para poder cambiar relaciones
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
        # prestamo = db.session.query(PrestamoModel).get_or_404(id)
        # data = request.get_json().items()
        # for key, value in data:
        #     if regex.match(r"(0?[1-9]|[12][0-9]|3[01])(-)(0?[1-9]|1[012])\2(\d{4})", str(value)) != None: #expresión regular para fechas tipo dd-mm-aaaa
        #         setattr(prestamo, key.lower(), datetime.strptime(value, "%d-%m-%Y"))
        #     else: setattr(prestamo, key.lower(), value)
        # db.session.add(prestamo)
        # db.session.commit()
        # return prestamo.to_json() , 201

    def delete(self, id):
        prestamo = db.session.query(PrestamoModel).get_or_404(id)
        db.session.delete(prestamo)
        db.session.commit()
        return '', 204

class Prestamos(Resource):
    def get(self):
        page = 1

        per_page = 10

        prestamos = db.session.query(PrestamoModel)

        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        ### FILTROS ###

        #prestamos con mas de 1 libro

        #prestamos proximos a finalizar

        #prestamos por usuario (usuario puede tener mas de un prestamo)

        #prestamos finalizados

        #

        ### FIN FILTROS ###
        
        prestamos = prestamos.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'prestamos' : [prestamo.to_json() for prestamo in prestamos],
                    'total' : prestamos.total,
                    'pages' : prestamos.pages,
                    'page' : page
        })

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