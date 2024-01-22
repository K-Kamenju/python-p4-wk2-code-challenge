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
            <HeroPowerForm />
          </Route>
          <Route exact path="/pizzas/:id/edit">
            <PowerEditForm />
          </Route>
          <Route exact path="/pizzas/:id">
            <Power />
          </Route>
          <Route exact path="/restaurants/:id">
            <Hero />
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
