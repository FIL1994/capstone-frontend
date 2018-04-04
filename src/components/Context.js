import React, { Component } from "react";
import axios from "helpers/axios";
import { URLS } from "constants/index";

const Context = React.createContext();

class Provider extends Component {
  state = {
    userDetails: {}
  };

  actions = () => ({
    setUserDetails: userDetails => this.setState({ userDetails })
  });

  async componentDidMount() {
    let res;
    try {
      res = await axios.get(URLS.USER);
    } catch (e) {
      return;
    }

    this.setState({
      userDetails: res.data
    });
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: this.actions()
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;

export { Provider };
export const Consumer = Context.Consumer;

export const withConsumer = Component => props => (
  <Consumer>{context => <Component context={context} {...props} />}</Consumer>
);
