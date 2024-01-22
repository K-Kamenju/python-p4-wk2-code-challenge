import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Restaurant() {
    const [{ data: restaurant, error, status }, setRestaurant] = useState({
      data: null,
      error: null,
      status: "pending",
    });
    const { id } = useParams();
  
    useEffect(() => {
      fetch(`/restaurants/${id}`)
        .then((r) => r.json())
        .then((restaurant) =>
          setRestaurant({ data: restaurant, error: null, status: "resolved" })
        )
        .catch((err) =>
          setRestaurant({
            data: null,
            error: err.error,
            status: "rejected",
          })
        );
    }, [id]);

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "rejected") return <h1>Error: {error.error}</h1>;

  return (
    <section>
      <h2>{restaurant.name}</h2>
      <h3>Pizzas:</h3>
      <ul>
        {restaurant.restaurant_pizzas.map((pizza) => (
          <li key={pizza.id}>
            <Link to={`/pizzas/${pizza.pizza.id}`}>{pizza.pizza.name}</Link>
          </li>
        ))}
      </ul>

      <Link to="/restaurant_pizzas/new">Add Pizza to Restaurant</Link>
    </section>
  );
}

export default Restaurant;
