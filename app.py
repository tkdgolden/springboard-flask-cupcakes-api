"""Flask app for Cupcakes"""
from flask import Flask, jsonify, request
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
app.app_context().push()
db.create_all()

@app.route("/api/cupcakes", methods=["GET"])
def get_all_cupcakes():
    """ returns json of all cupcakes """

    json_cupcakes = Cupcake.json_list_cupcakes()
    return json_cupcakes

@app.route("/api/cupcakes/<int:cupcake_id>", methods=["GET"])
def get_cupcake(cupcake_id):
    """ returns json of requested cupcake """

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized_cupcake = Cupcake.serialize_cupcake(cupcake)
    return jsonify(cupcake=serialized_cupcake)

@app.route("/api/cupcakes", methods=["POST"])
def create_cupcake():
    """ creates a cupcake, returns cupcake json """

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json["image"]

    cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(cupcake)
    db.session.commit()

    serialized_cupcake = Cupcake.serialize_cupcake(cupcake)

    return (jsonify(cupcake=serialized_cupcake), 201)

@app.route("/api/cupcakes/<int:cupcake_id>", methods=["PATCH"])
def update_cupcake(cupcake_id):
    """ updates a given cupcake, returns cupcake json """

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    cupcake.flavor = request.json.get("flavor", cupcake.flavor)
    cupcake.size = request.json.get("size", cupcake.size)
    cupcake.rating = request.json.get("rating", cupcake.rating)
    cupcake.image = request.json.get("image", cupcake.image)

    db.session.commit()

    serialized_cupcake = Cupcake.serialize_cupcake(cupcake)

    return (jsonify(cupcake=serialized_cupcake))

@app.route("/api/cupcakes/<int:cupcake_id>", methods=["DELETE"])
def delete_cupcake(cupcake_id):
    """ deletes given cupcake, returns "deleted" """

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    db.session.delete(cupcake)
    db.session.commit()

    return (jsonify(message="deleted"))