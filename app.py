"""Flask app for Cupcakes"""
from flask import Flask
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
app.app_context().push()
db.create_all()

@app.route("/cupcakes", methods=["GET"])
def get_all_cupcakes():
    """ returns json of all cupcakes """

    json_cupcakes = Cupcake.json_list_cupcakes()
    return json_cupcakes