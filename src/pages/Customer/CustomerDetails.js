import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

class CustomerDetails extends Component {
  state = {
    customer: {}
  };

  componentDidMount() {
    axios
      .get(`http://207.148.28.48:3000/customer/${this.props.match.params.id}`)
      .then(res => this.setState({ customer: res.data }))
      .catch(() => this.props.history.push("/customer"));
  }

  render() {
    const { customer } = this.state;

    return (
      <Container>
        {!_.isEmpty(customer) && (
          <Card centered>
            <Card.Content>
              <label>First Name: </label>
              {customer.firstName} <br />
              <label>Last Name: </label>
              {customer.lastName} <br />
              <label>Email: </label>
              {customer.email} <br />
              <label>Company Name: </label>
              {customer.companyName} <br />
              <label>Cell Phone: </label>
              {customer.cellPhoneNumber} <br />
              <label>Work Phone: </label>
              {customer.workPhoneNumber} <br />
            </Card.Content>
          </Card>
        )}
      </Container>
    );
  }
}

export default CustomerDetails;