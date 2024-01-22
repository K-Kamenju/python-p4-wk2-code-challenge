import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';

function PizzaEditForm() {
  const [{ data: pizza, errors, status }, setPizza] = useState({
    data: null,
    errors: [],
    status: "pending",
  });
  const [ingredients, setingredients] = useState("");
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/pizzas/${id}`)
      .then((r) => r.json())
      .then((pizza) => {
        setPizza({ data: pizza, errors: [], status: "resolved" });
        setingredients(pizza.ingredients);
      })
      .catch((err) =>
        setPizza({ data: null, errors: [err.error], status: "rejected" })
      );
  }, [id]);

  if (status === "pending") return <h1>Loading...</h1>;

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/pizzas/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients,
      }),
    })
      .then((r) => r.json())
      .then((updatedPizza) => {
        setPizza({ data: updatedPizza, errors: [], status: "resolved" });
        history.push(`/pizzas/${updatedPizza.id}`);
      })
      .catch((err) =>
        setPizza({ data: pizza, errors: err.errors, status: "rejected" })
      );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editing {pizza.name}</h2>
      <label htmlFor="ingredients">Ingredients:</label>
      <textarea
        id="ingredients"
        name="ingredients"
        rows="4"
        value={ingredients}
        onChange={(e) => setingredients(e.target.value)}
      />
      {errors.length > 0
        ? errors.map((err) => (
            <p key={err} style={{ color: "red" }}>
              {err}
            </p>
          ))
        : null}
      <button type="submit">Update pizza</button>
    </form>
  );
}

export default PizzaEditForm;
