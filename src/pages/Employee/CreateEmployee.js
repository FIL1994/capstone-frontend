import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import { URLS } from "../../constants";
import EmployeeForm from "./EmployeeForm";

class CreateEmployee extends Component {
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async newEmployee => {
    await axios.post(URLS.EMPLOYEE, newEmployee);

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
