from main import create_app
import os


app = create_app()

app.app_context().push()


from main import db
if __name__ == '__main__':
    # app.run(debug=True,port=os.getenv('PORT'))
    db.create_all()
    app.run(debug=True,port=os.getenv('PORT'))
    


