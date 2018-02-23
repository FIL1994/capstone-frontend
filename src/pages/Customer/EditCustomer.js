import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import CustomerForm from "./CustomerForm";

class EditCustomer extends Component {
  state = {
    customer: {}
  };

  componentDidMount() {
    axios
      .get(`http://207.148.28.48:3000/customer/${this.props.match.params.id}`)
      .then(res => this.setState({ customer: res.data }))
      .catch(() => this.props.history.push("/customer"));
  }

  handleSubmit = async newCustomer => {
    await axios.put(
      `http://207.148.28.48:3000/customer/${this.props.match.params.id}`,
      newCustomer
    );

    this.props.history.push("/customer");
  };

  render() {
    const { customer } = this.state;

    console.log(this.props.match.params.id);

    return (
      <Container>
        {!_.isEmpty(customer) && (
          <CustomerForm edit customer={customer} onSubmit={this.handleSubmit} />
        )}
      </Container>
    );
  }
}

export default EditCustomer;
