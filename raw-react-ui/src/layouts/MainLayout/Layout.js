import React, { Suspense, Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../config/Routes";

const loading = <div>Loading</div>;

export default class Layout extends Component {
  render() {
    const routes = this.renderRoutes();
    return (
      <Suspense fallback={loading}>
        <main className="main-layout full-size">
          <Switch>{routes}</Switch>
        </main>
      </Suspense>
    );
  }

  renderRoutes() {
    const routeElements = [];
    for (let i = 0; i < routes.length; i += 1) {
      const key = `route-${i}`;
      const route = routes[i];
      const { path, name } = route;
      routeElements.push(
        <Route
          key={key}
          path={path}
          name={name}
          exact={true}
          render={props => <route.component {...props} />}
        />
      );
    }
    return routeElements;
  }
}
