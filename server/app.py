from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError  # Import IntegrityError

from models import db, Restaurant, Pizza, RestaurantPizza

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizzaria.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)


@app.route('/')
def home():
    response_body = {
        "Hello": "Welcome to my Pizzaria Backend",
        "To Continue": "Enter a valid URL Route"
    }

    response = make_response(jsonify(response_body), 200)
    return response


@app.route('/restaurants')
def restaurants():
    restaurants_list = [restaurant.to_dict() for restaurant in Restaurant.query.all()]
    return make_response(jsonify(restaurants_list), 200)


@app.route('/restaurants/<int:id>')
def restaurants_by_id(id):
    restaurant = Restaurant.query.filter_by(id=id).first()

    if restaurant:
        restaurant_data = restaurant.to_dict()
        return make_response(jsonify(restaurant_data), 200)
    else:
        error_response = {"error": "Restaurant not found"}
        return make_response(jsonify(error_response), 404)


@app.route('/pizzas')
def pizzas():
    pizzas_list = []
    for pizza in Pizza.query.all():
        pizza_data = {
            "id": pizza.id,
            "name": pizza.name,
            "description": pizza.description  # Ensure the model has a 'description' field
        }
        pizzas_list.append(pizza_data)

    return make_response(jsonify(pizzas_list), 200)


@app.route('/pizzas/<int:id>', methods=['GET', 'PATCH'])
def pizzas_by_id(id):
    if request.method == 'GET':
        pizza = Pizza.query.get(id)

        if pizza:
            pizza_data = {
                "id": pizza.id,
                "name": pizza.name,
                "description": pizza.description
            }
            return make_response(jsonify(pizza_data), 200)
        else:
            error_response = {"error": "Pizza not found"}
            return make_response(jsonify(error_response), 404)

    elif request.method == 'PATCH':
        pizza = Pizza.query.get(id)

        if pizza:
            data = request.get_json()

            try:
                for attr in data:
                    setattr(pizza, attr, data[attr])

                # Validate the model before committing changes
                db.session.commit()

                pizza_data = {
                    "id": pizza.id,
                    "name": pizza.name,
                    "description": pizza.description
                }
                return make_response(jsonify(pizza_data), 200)

            except IntegrityError as e:  # Catch IntegrityError for validation issues
                db.session.rollback()  # Rollback changes to avoid leaving the database in an inconsistent state
                error_response = {"error": str(e)}
                return make_response(jsonify(error_response), 400)

        else:
            error_response = {"error": "Pizza not found"}
            return make_response(jsonify(error_response), 404)


@app.route('/restaurant_pizzas', methods=['POST'])
def restaurant_pizzas():
    data = request.get_json()

    try:
        new_restaurant_pizza = RestaurantPizza(
            price=data['price'],
            pizza_id=data['pizza_id'],
            restaurant_id=data['restaurant_id']
        )

        db.session.add(new_restaurant_pizza)
        db.session.commit()

        return make_response(new_restaurant_pizza.to_dict(), 201)

    except IntegrityError as e:  # Catch IntegrityError for validation issues
        db.session.rollback()
        error_response = {"error": "Integrity error: {}".format(str(e))}
        return make_response(jsonify(error_response), 400)


if __name__ == '__main__':
    app.run(port=5555)
