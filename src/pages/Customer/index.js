import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";
import axios from "axios";

class Customer extends Component {
  state = {
    customers: []
  };

  componentWillMount() {
    this.getCustomers();
  }

  getCustomers = async () =>
    this.setState({
      customers: (await axios.get("http://207.148.28.48:3000/customer")).data
    });

  render() {
    const { customers } = this.state;

    console.log(customers);

    return (
      <Container>
        <h1>Customers</h1>
        <Divider />
        <Button
          primary
          as={Link}
          to="/customer/create"
          style={{ marginBottom: 20 }}
        >
          Create Customer
        </Button>
        {customers.map(c => (
          <div key={c.id}>
            {c.firstName} {c.lastName}
            <Button.Group fluid>
              <Button
                as={Link}
                to={`/customer/${c.id}`}
                color="green"
                content="View"
              />
              <Button
                as={Link}
                to={`/customer/edit/${c.id}`}
                color="yellow"
                content="Edit"
              />
              <Button
                onClick={() =>
                  axios
                    .delete(`http://207.148.28.48:3000/customer/${c.id}`)
                    .then(() => this.getCustomers())
                    .catch(err => console.log("delete customer", c, err))
                }
                color="red"
                content="Delete"
              />
            </Button.Group>
            <hr />
          </div>
        ))}
      </Container>
    );
  }
}

export default Customer;
