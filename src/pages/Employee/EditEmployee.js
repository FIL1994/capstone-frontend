import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import { URLS } from "../../constants";
import EmployeeForm from "./EmployeeForm";

class EditEmployee extends Component {
  state = {
    employee: {}
  };

  componentDidMount() {
    axios
      .get(`${URLS.EMPLOYEE}/${this.props.match.params.id}`)
      .then(res => this.setState({ employee: res.data }))
      .catch(() => this.props.history.push("/employee"));
  }

  handleSubmit = async newEmployee => {
    await axios.put(
      `${URLS.EMPLOYEE}/${this.props.match.params.id}`,
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
