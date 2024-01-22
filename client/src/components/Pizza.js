import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Pizza() {
    const [{ data: pizza, error, status }, setPizza] = useState({
      data: null,
      error: null,
      status: "pending",
    });
    const { id } = useParams();
  
    useEffect(() => {
      fetch(`/pizzas/${id}`)
        .then((r) => r.json())
        .then((pizza) =>
          setPizza({ data: pizza, error: null, status: "resolved" })
        )
        .catch((err) =>
          setPizza({ data: null, error: err.error, status: "rejected" })
        );
    }, [id]);
  

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "rejected") return <h1>Error: {error.error}</h1>;

  return (
    <section>
      <h2>{pizza.name}</h2>
      <p>{pizza.ingredients}</p>
      <p>
        <Link to="/restaurant_pizzas/new">Add Restaurant pizza</Link>
      </p>
      <p>
        <Link to={`/pizzas/${pizza.id}/edit`}>Edit pizza Ingredients</Link>
      </p>
    </section>
  );
}

export default Pizza;
