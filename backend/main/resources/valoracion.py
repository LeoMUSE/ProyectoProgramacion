from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ValoracionModel, UsuarioModel, LibroModel
from sqlalchemy import func, desc, asc

class BusquedaIncorrecta(Exception):
    pass
    
# VALORACIONES = {
#    1:{'Usuario:':'MaritoRz', 'Libro':'Odisea','Valoración:':'1/5'},
#    2:{'Usuario:': 'PipeVC', 'Libro':'El Código Da Vinci','Valoracion': '3/5'},
#    3:{'Usuario:':'Facu81', 'Libro':'Don Quijote de la Mancha', 'Valoracion':'5/5'}
# }

class Valoracion(Resource):
    def get(self, id):
        valoracion = db.session.query(ValoracionModel).get_or_404(id)
        return valoracion.to_json()

    #modificar metodo PUT, para poder cambair relaciones
    def put(self, id):
        valoracion = db.session.query(ValoracionModel).get_or_404(id)
        data = request.get_json()

        nuevo_usuario_id = data.get('usuario')
        if nuevo_usuario_id:
            nuevo_usuario = UsuarioModel.query.get_or_404(nuevo_usuario_id)
            valoracion.fk_user_valoracion = nuevo_usuario

        nuevo_libro_id = data.get('libro')
        if nuevo_libro_id:
            nuevo_libro = LibroModel.query.get_or_404(nuevo_libro_id)
            valoracion.fk_libro_valoracion = nuevo_libro
        for key, value in data.items():
            setattr(valoracion, key.lower(), value)

        db.session.add(valoracion)
        db.session.commit()
        return valoracion.to_json(), 201
        # valoracion = db.session.query(ValoracionModel).get_or_404(id)
        # data = request.get_json().items()
        # for key, value in data:
        #     setattr(valoracion, key, value)
        # db.session.add(valoracion)
        # db.session.commit()
        # return valoracion.to_json() , 201                                                                

    def delete(self, id):
        valoracion = db.session.query(ValoracionModel).get_or_404(id)
        db.session.delete(valoracion)
        db.session.commit()
        return '', 204

class Valoraciones(Resource):
    def get(self):
        page = 1
        #Cantidad de elementos por página por defecto
        per_page = 10
        
        #no ejecuto el .all()
        valoraciones = db.session.query(ValoracionModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        ### FILTROS ###

        #valoraciones por libro
        if request.args.get("nroValoracion"):
            valoraciones=valoraciones.filter(ValoracionModel.valoracion.like("%"+request.args.get('nroValoracion')+"%"))

        #libro del más valorado al menos valorado 
        if request.args.get('ordenValoracion') == 'Valoraciones_desc':
            valoraciones=valoraciones.order_by(desc(ValoracionModel.valoracion))
        elif request.args.get('ordenValoracion') == "Valoraciones_asc":
            valoraciones=valoraciones.order_by(asc(ValoracionModel.valoracion))
        else:
            raise BusquedaIncorrecta("Argumento Incorrecto") #Arreglar sin body html
        

        ### FIN FILTROS ####
        
        valoraciones = valoraciones.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({'valoraciones': [valoracion.to_json() for valoracion in valoraciones],
                  'total': valoraciones.total,
                  'pages': valoraciones.pages,
                  'page': page
                })

    def post(self):
        valoracion = ValoracionModel.from_json(request.get_json())
        db.session.add(valoracion)
        db.session.commit()
        print(valoracion)
        return valoracion.to_json()
    
if __name__ == '__main__':
    pass