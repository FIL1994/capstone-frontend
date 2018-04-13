import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import _ from "lodash";
import moment from "moment";

import DatePicker from "components/DatePicker";

class EmployeeForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    address: "",
    city: "",
    payrollStartDate: "",
    phoneNumber: "",
    postalCode: "",
    emergencyContact: "",
    ..._.pickBy(this.props.employee, _.identity)
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      address,
      city,
      payrollStartDate,
      phoneNumber,
      postalCode
    } = this.state;

    console.log("submit employee", this.state);

    this.props.onSubmit({
      firstName,
      lastName,
      email,
      birthDate,
      address,
      city,
      payrollStartDate,
      phoneNumber,
      postalCode
    });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      address,
      city,
      payrollStartDate,
      phoneNumber,
      postalCode,
      emergencyContact
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
        <div className="field">
          <label>Birth Date</label>
          <DatePicker
            onDateChange={date =>
              date && this.setState({ birthDate: date.format() })
            }
            initialDate={moment(birthDate)}
          />
        </div>
        <Form.Input
          fluid
          label="Address"
          name="address"
          value={address}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="City"
          name="city"
          value={city}
          onChange={this.handleChange}
        />
        <div className="field">
          <label>Payroll Start Date</label>
          <DatePicker
            onDateChange={date =>
              date && this.setState({ payrollStartDate: date.format() })
            }
            initialDate={moment(payrollStartDate)}
          />
        </div>
        <Form.Input
          fluid
          label="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          label="Postal Code"
          name="postalCode"
          value={postalCode}
          onChange={this.handleChange}
        />
        <Button primary type="submit">
          {this.props.edit ? "Edit" : "Create"} Employee
        </Button>
      </Form>
    );
  }
}

EmployeeForm.propTypes = {
  edit: PropTypes.bool,
  employee: PropTypes.object,
  onSubmit: PropTypes.func
};

EmployeeForm.defaultProps = {
  edit: false,
  employee: {},
  onSubmit: _.noop
};

export default EmployeeForm;
