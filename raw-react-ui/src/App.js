import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { MainLayout } from "./layouts";

class App extends Component {
  state = {};

  componentDidMount() {}

  isReady() {
    return true;
  }

  getInherittedProps() {
    return {};
  }

  render() {
    const isReady = this.isReady();
    if (!isReady) {
      return null;
    }
    return (
      <HashRouter>
        <Switch>{this.renderMainRoutes()}</Switch>
      </HashRouter>
    );
  }

  renderMainRoutes() {
    return (
      <Route
        path="/"
        component={props => (
          <MainLayout {...props} {...this.getInherittedProps()} />
        )}
      />
    );
  }
}

export default App;
