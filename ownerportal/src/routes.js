import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignInComponent from "./components/signInComponent/SignIn.Component";
import AddItemComponent from "./components/AddItemComponent/AddItemComponent";
import RestaurantComponent from "./components/RestaurantComponent/Restaurant.Component";

class Router extends Component {
  state = {};
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/signin/" />
            <Route exact path="/signin/" component={SignInComponent} />
            <Route path="/restaurantDetails/" component={RestaurantComponent} />
            <Route path="/addItemComponent/" component={AddItemComponent} /> 
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Router;
