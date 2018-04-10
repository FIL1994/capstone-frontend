import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";

import { URLS } from "constants/index";

class EmployeeDetails extends Component {
  state = {
    employee: {}
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    axios
      .get(`${URLS.EMPLOYEE}/${this.props.match.params.id}`)
      .then(res => this.setState({ employee: res.data }))
      .catch(() => this.props.history.push("/employee"));
  }

  render() {
    const { employee } = this.state;
    const { id } = this.props.match.params;

    console.log(employee);

    return (
      <Container>
        {!_.isEmpty(employee) && (
          <Card fluid>
            <Card.Content>
              <span style={{ float: "right" }}>
                <Button
                  as={Link}
                  to={`/employee/edit/${id}`}
                  circular
                  color="vk"
                  icon="edit"
                  onClick={e => e.stopPropagation()}
                />
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    axios
                      .delete(`${URLS.EMPLOYEE}/${id}`)
                      .then(() => this.props.push("/employee"))
                      .catch(err => console.log("delete employee", err));
                  }}
                  circular
                  color="red"
                  icon="delete"
                />
              </span>
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
