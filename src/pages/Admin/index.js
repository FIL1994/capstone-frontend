import React, { Component } from "react";
import { Container } from "semantic-ui-react";

class Admin extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Container>
        <h2>Admin</h2>
      </Container>
    );
  }
}

export default Admin;
