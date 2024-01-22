import React, { useEffect, useState } from "react";
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
    // Fetch pizzas and restaurants
    const fetchData = async () => {
      try {
        const pizzasResponse = await fetch("/pizzas");
        const restaurantsResponse = await fetch("/restaurants");

        const pizzasData = await pizzasResponse.json();
        const restaurantsData = await restaurantsResponse.json();

        setPizzas(pizzasData);
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      pizza_id: pizzaId,
      price,
      restaurant_id: restaurantId
    };

    console.log("Before fetch");
  fetch("/restaurant_pizzas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((r) => {
      console.log("Inside then");
      if (!r.ok) {
        throw new Error("Failed to add restaurant pizza");
      }
      return r.json();
    })
    .then((newRestaurantPizza) => {
      console.log("Success:", newRestaurantPizza);
      history.push(`/restaurants/${newRestaurantPizza.restaurant.id}`);
    })
    .catch((err) => {
      console.error("Error:", err);
      setFormErrors([err.message]);
    });
    }

  // Check if data is still loading
  if (!restaurants || !pizzas) {
    return <h1>Loading...</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Pizza Selection */}
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

      {/* Restaurant Selection */}
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

      {/* Price Input */}
      <label htmlFor="price">Price:</label>
      <input
        type="text"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Display Form Errors */}
      {formErrors.length > 0 && (
        <div style={{ color: "red" }}>
          {formErrors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <button type="submit">Add Restaurant Pizza</button>
    </form>
  );
}

export default RestaurantPizzaForm;
