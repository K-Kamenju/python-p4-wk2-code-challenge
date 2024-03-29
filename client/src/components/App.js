import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Restaurant from "./Restaurant";
import Home from "./Home";
import RestaurantPizzaForm from "./RestaurantPizzaForm";
import Pizza from "./Pizza";
import PizzaEditForm from "./PizzaEditForm";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route exact path="/restaurant_pizzas/new">
            <RestaurantPizzaForm />
          </Route>
          <Route exact path="/pizzas/:id/edit">
            <PizzaEditForm />
          </Route>
          <Route exact path="/pizzas/:id">
            <Pizza />
          </Route>
          <Route exact path="/restaurants/:id">
            <Restaurant />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
