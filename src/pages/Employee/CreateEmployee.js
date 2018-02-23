import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import EmployeeForm from "./EmployeeForm";

class CreateEmployee extends Component {
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async newEmployee => {
    await axios.post("http://207.148.28.48:3000/employee", newEmployee);

    this.props.history.push("/employee");
  };

  render() {
    return (
      <Container>
        <EmployeeForm onSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

export default CreateEmployee;
