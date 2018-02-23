import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import EmployeeForm from "./EmployeeForm";

class EditEmployee extends Component {
  state = {
    employee: {}
  };

  componentDidMount() {
    axios
      .get(`http://207.148.28.48:3000/employee/${this.props.match.params.id}`)
      .then(res => this.setState({ employee: res.data }))
      .catch(() => this.props.history.push("/employee"));
  }

  handleSubmit = async newEmployee => {
    await axios.put(
      `http://207.148.28.48:3000/employee/${this.props.match.params.id}`,
      newEmployee
    );

    this.props.history.push("/employee");
  };

  render() {
    const { employee } = this.state;

    return (
      <Container>
        {!_.isEmpty(employee) && (
          <EmployeeForm edit employee={employee} onSubmit={this.handleSubmit} />
        )}
      </Container>
    );
  }
}

export default EditEmployee;
