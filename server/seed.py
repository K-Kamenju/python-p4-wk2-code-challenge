from app import app
from models import db, Restaurant, Pizza, RestaurantPizza

from random import choice

with app.app_context():
    
    Restaurant.query.delete()
    Pizza.query.delete()
    RestaurantPizza.query.delete()

    # Create restaurants
    restaurants = [
        Restaurant(name="Pizza Palace", address="123 Main St"),
        Restaurant(name="Cheesy Delight", address="456 Oak St"),
        Restaurant(name="Crust Haven", address="789 Maple St"),
        Restaurant(name="Slice City", address="101 Pepperoni Ave"),
        Restaurant(name="Mozzarella Mansion", address="567 Dough St"),
        Restaurant(name="Pizzeria Paradiso", address="876 Tomato Ln"),
        Restaurant(name="Saucy Spot", address="234 Cheese Blvd"),
        Restaurant(name="Olive Oven", address="876 Olive St"),
        Restaurant(name="Meatball Manor", address="543 Meat St"),
        Restaurant(name="Veggie Villa", address="987 Veggie Ave"),
    ]

    db.session.bulk_save_objects(restaurants)
    db.session.commit()

    # Create pizzas
    pizzas = [
        Pizza(name="Margherita", ingredients="Tomato, Mozzarella, Basil"),
        Pizza(name="Pepperoni", ingredients="Tomato, Mozzarella, Pepperoni"),
        Pizza(name="Vegetarian Deluxe", ingredients="Tomato, Mozzarella, Mushrooms, Bell Peppers, Olives"),
        Pizza(name="Meat Lovers", ingredients="Tomato, Mozzarella, Sausage, Bacon, Ham"),
        Pizza(name="Hawaiian", ingredients="Tomato, Mozzarella, Ham, Pineapple"),
        Pizza(name="BBQ Chicken", ingredients="BBQ Sauce, Mozzarella, Chicken, Red Onion"),
        Pizza(name="Supreme", ingredients="Tomato, Mozzarella, Pepperoni, Sausage, Mushrooms, Onions, Bell Peppers, Olives"),
        Pizza(name="Capricciosa", ingredients="Tomato, Mozzarella, Ham, Mushrooms, Artichokes"),
        Pizza(name="Buffalo Chicken", ingredients="Buffalo Sauce, Mozzarella, Chicken, Red Onion"),
        Pizza(name="Spinach and Feta", ingredients="Tomato, Mozzarella, Spinach, Feta"),
        Pizza(name="Four Cheese", ingredients="Tomato, Mozzarella, Gorgonzola, Fontina, Parmesan"),
        Pizza(name="Pesto Chicken", ingredients="Pesto Sauce, Mozzarella, Chicken, Sun-dried Tomatoes"),
        Pizza(name="Truffle Mushroom", ingredients="Tomato, Mozzarella, Mushrooms, Truffle Oil"),
        Pizza(name="White Pizza", ingredients="Mozzarella, Ricotta, Garlic, Olive Oil"),
        Pizza(name="Margarita", ingredients="Tomato, Mozzarella, Basil, Olive Oil"),
    ]

    db.session.bulk_save_objects(pizzas)
    db.session.commit()

    # Create RestaurantPizza relationships
    restaurant_pizzas = [
        RestaurantPizza(
            price=choice(range(1, 31)),
            pizza_id=choice(pizzas).id,
            restaurant_id=choice(restaurants).id
        )
        for _ in range(20)
    ]

    db.session.bulk_save_objects(restaurant_pizzas)
    db.session.commit()
