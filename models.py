"""Models for Cupcake app."""
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """ A cupcake has an id, flavor, size, rating, and image """

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    flavor = db.Column(db.Text,
                       nullable=False)
    size = db.Column(db.Text,
                     nullable=False)
    rating = db.Column(db.Float,
                       nullable=False)
    image = db.Column(db.Text,
                      nullable=False,
                      default="https://tinyurl.com/demo-cupcake")
    
    def serialize_cupcake(self):
        """ return dict object of given cupcake (for purpose of turning into json)"""

        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image
        }
    
    @classmethod
    def json_list_cupcakes(cls):
        """ return json object of all cupcakes """

        cupcakes = cls.query.all()
        serialized = [Cupcake.serialize_cupcake(cupcake) for cupcake in cupcakes]
        return jsonify(cupcakes=serialized)