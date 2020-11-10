import { Component } from "react";
import { parseQuery } from "../utils";

export default class BasePage extends Component {
  state = {};
  query = {};
  params = {};

  constructor() {
    super();
    this.query = parseQuery(this.props.location.search);
    this.params = this.props.match.params;
  }

  navigate(target, state = {}) {
    this.props.history.push(target);
  }

  getQuery() {
    const { search } = this.props.location;
    return new URLSearchParams(search);
  }
}
