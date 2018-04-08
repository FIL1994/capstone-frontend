import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "helpers/axios";

import { URLS } from "constants/index";
import EmployeeForm from "./EmployeeForm";

class CreateEmployee extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
