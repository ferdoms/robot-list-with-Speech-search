import React, { Component } from "react";

class ErroBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(erro, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <h1>Oooops. That is not good</h1>;
    }
    return this.props.children;
  }
}

export default ErroBoundry;
