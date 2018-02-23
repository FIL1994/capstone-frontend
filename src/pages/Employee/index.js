import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";
import axios from "axios";

class Employee extends Component {
  state = {
    employees: []
  };

  componentWillMount() {
    this.getEmployees();
  }

  getEmployees = async () =>
    this.setState({
      employees: (await axios.get("http://207.148.28.48:3000/employee")).data
    });

  render() {
    const { employees } = this.state;

    console.log(employees);

    return (
      <Container>
        <h1>Employees</h1>
        <Divider />
        <Button
          primary
          as={Link}
          to="/employee/create"
          style={{ marginBottom: 20 }}
        >
          Create Employee
        </Button>
        {employees.map(e => (
          <div key={e.id}>
            {e.firstName} {e.lastName} <br />
            {e.email}
            <Button.Group fluid>
              <Button
                as={Link}
                to={`/employee/${e.id}`}
                color="green"
                content="View"
              />
              <Button
                as={Link}
                to={`/employee/edit/${e.id}`}
                color="yellow"
                content="Edit"
              />
            </Button.Group>
            <hr />
          </div>
        ))}
      </Container>
    );
  }
}

export default Employee;
