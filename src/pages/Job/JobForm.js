import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import Select from "react-virtualized-select";

class JobForm extends Component {
  state = {
    dateOpened: "",
    description: "",
    ..._.pickBy(this.props.job, _.identity),
    customers: [],
    employees: [],
    selectedCustomer: "",
    selectedEmployees: []
  };

  componentDidMount() {
    axios.get(`http://207.148.28.48:3000/customer`).then(res =>
      this.setState({
        customers: res.data.map(c => ({
          label: `${c.firstName} ${c.lastName}`,
          value: c.id
        }))
      })
    );

    axios.get(`http://207.148.28.48:3000/employee`).then(res =>
      this.setState({
        employees: res.data.map(e => ({
          label: `${e.firstName} ${e.lastName}`,
          value: e.id
        }))
      })
    );
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async e => {
    e.preventDefault();
    
    const { dateOpened, description } = this.state;

    console.log("submit job", this.state);

    this.props.onSubmit({
      dateOpened,
      description
    });
  };

  render() {
    const { dateOpened, description } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          label="Description"
          name="description"
          value={description}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        />
        <Form.Input
          fluid
          label="Date Opened"
          name="dateOpened"
          value={dateOpened}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        />
        <label>Customer</label>
        <Select
          options={this.state.customers}
          onChange={selectedCustomer => this.setState({ selectedCustomer })}
          value={this.state.selectedCustomer}
          placeholder="select a customer"
          style={{ marginBottom: 20 }}
        />
        <label>Employee(s)</label>
        <Select
          multi
          options={this.state.employees}
          onChange={selectedEmployees => this.setState({ selectedEmployees })}
          value={this.state.selectedEmployees}
          placeholder="select employee(s)"
          style={{ marginBottom: 20 }}
        />
        <Button primary type="submit">
          Create Job
        </Button>
      </form>
    );
  }
}

JobForm.propTypes = {
  edit: PropTypes.bool,
  customer: PropTypes.object,
  onSubmit: PropTypes.func
};

JobForm.defaultProps = {
  edit: false,
  customer: {},
  onSubmit: _.noop
};

export default JobForm;