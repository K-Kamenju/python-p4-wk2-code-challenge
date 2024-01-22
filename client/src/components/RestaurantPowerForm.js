import { useEffect, useState } from "react";
import { useHistory } from "react-router";

function RestaurantPizzaForm() {
  const [restaurants, setRestaurants] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [pizzaId, setPizzaId] = useState("");
  const [price, setPrice] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("/restaurants")
      .then((r) => r.json())
      .then(setRestaurants);
  }, []);

  useEffect(() => {
    fetch("/pizzas")
      .then((r) => r.json())
      .then(setPizzas);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      restaurant_id: restaurantId,
      pizza_id: pizzaId,
      price,
    };
    fetch("/restaurant_pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newRestaurantPizza) => {
        history.push(`/restaurants/${newRestaurantPizza.hero.id}`);
      })
      .catch((err) => setFormErrors(err.errors));
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="pizza_id">Pizza:</label>
      <select
        id="pizza_id"
        name="pizza_id"
        value={pizzaId}
        onChange={(e) => setPizzaId(e.target.value)}
      >
        <option value="">Select a Pizza</option>
        {pizzas.map((pizza) => (
          <option key={pizza.id} value={pizza.id}>
            {pizza.name}
          </option>
        ))}
      </select>
      <label htmlFor="restaurant_id">Restaurant:</label>
      <select
        id="restaurant_id"
        name="restaurant_id"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
      >
        <option value="">Select a restaurant</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </select>
      <label htmlFor="price">price:</label>
      <input
        type="text"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {formErrors.length > 0
        ? formErrors.map((err) => (
            <p key={err} style={{ color: "red" }}>
              {err}
            </p>
          ))
        : null}
      <button type="submit">Add Restaurant Pizza</button>
    </form>
  );
}

export default RestaurantPizzaForm;
