import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import CustomerForm from "./CustomerForm";

class CreateCustomer extends Component {
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async newCustomer => {
    await axios.post("http://207.148.28.48:3000/customer", newCustomer);

    this.props.history.push("/customer");
  };

  render() {
    return (
      <Container>
        <CustomerForm onSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

export default CreateCustomer;
