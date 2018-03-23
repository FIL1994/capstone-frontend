import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

class EmployeeDetails extends Component {
  state = {
    employee: {}
  };

  componentDidMount() {
    axios
      .get(`http://207.148.28.48:3000/employee/${this.props.match.params.id}`)
      .then(res => this.setState({ employee: res.data }))
      .catch(() => this.props.history.push("/employee"));
  }

  render() {
    const { employee } = this.state;

    console.log(employee);

    return (
      <Container>
        {!_.isEmpty(employee) && (
          <Card fluid>
            <Card.Content>
              <label>First Name: </label>
              {employee.firstName} <br />
              <label>Last Name: </label>
              {employee.lastName} <br />
              <label>Email: </label>
              {employee.email} <br />
              <label>Birth Date: </label>
              {employee.birthDate} <br />
              <label>Address: </label>
              {employee.address} <br />
              <label>City: </label>
              {employee.city} <br />
              <label>Social Insurance Number: </label>
              {employee.socialInsuranceNumber} <br />
              <label>Payroll Start Date: </label>
              {employee.payrollStartDate} <br />
              <label>Phone Number: </label>
              {employee.phoneNumber} <br />
              <label>Postal Code: </label>
              {employee.postalCode} <br />
              <label>Emergency Contact: </label>
              {employee.emergencyContact} <br />
            </Card.Content>
          </Card>
        )}
      </Container>
    );
  }
}

export default EmployeeDetails;
