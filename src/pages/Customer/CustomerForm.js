import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import _ from "lodash";

class CustomerForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    cellPhonenumber: "",
    workPhoneNumber: "",
    companyName: "",
    primaryContactName: "",
    secondaryContactName: "",
    primaryEmail: "",
    secondaryEmail: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    ..._.pickBy(this.props.customer, _.identity)
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const {
      firstName,
      lastName,
      email,
      cellPhoneNumber,
      workPhoneNumber,
      companyName,
      primaryContactName,
      secondaryContactName,
      primaryEmail,
      secondaryEmail,
      primaryPhoneNumber,
      secondaryPhoneNumber
    } = this.state;

    console.log("submit customer", this.state);

    this.props.onSubmit({
      firstName,
      lastName,
      email,
      cellPhoneNumber,
      workPhoneNumber,
      companyName,
      primaryContactName,
      secondaryContactName,
      primaryEmail,
      secondaryEmail,
      primaryPhoneNumber,
      secondaryPhoneNumber
    });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      cellPhoneNumber,
      workPhoneNumber,
      companyName,
      primaryContactName,
      secondaryContactName,
      primaryEmail,
      secondaryEmail,
      primaryPhoneNumber,
      secondaryPhoneNumber
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Cell Phone Number"
          name="cellPhoneNumber"
          value={cellPhoneNumber}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Work Phone Number"
          name="workPhoneNumber"
          value={workPhoneNumber}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Company Name"
          name="companyName"
          value={companyName}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Primary Contact Name"
          name="primaryContactName"
          value={primaryContactName}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Primary Email"
          name="primaryEmail"
          value={primaryEmail}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Primary Phone Number"
          name="primaryPhoneNumber"
          value={companyName}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Secondary Contact Name"
          name="secondaryContactName"
          value={secondaryContactName}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Secondary Email"
          name="secondaryEmail"
          value={secondaryEmail}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Secondary Phone Number"
          name="secondaryPhoneNumber"
          value={secondaryPhoneNumber}
          onChange={this.handleChange}
        />
        <Button primary type="submit">
          {this.props.edit ? "Edit" : "Create"} Customer
        </Button>
      </Form>
    );
  }
}

CustomerForm.propTypes = {
  edit: PropTypes.bool,
  customer: PropTypes.object,
  onSubmit: PropTypes.func
};

CustomerForm.defaultProps = {
  edit: false,
  customer: {},
  onSubmit: _.noop
};

export default CustomerForm;
