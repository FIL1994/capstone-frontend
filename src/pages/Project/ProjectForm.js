import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import Select from "react-virtualized-select";

import { URLS } from "../../constants";

class ProjectForm extends Component {
  state = {
    dateOpened: "",
    description: "",
    customers: [],
    selectedCustomer: ""
  };

  componentDidMount() {
    axios.get(URLS.CUSTOMER).then(res =>
      this.setState({
        customers: res.data.map(c => ({
          label: `${c.firstName} ${c.lastName}`,
          value: c.id
        }))
      })
    );
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          label="Description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        />
        <Form.Input
          fluid
          label="Date Opened"
          name="dateOpened"
          value={this.state.dateOpened}
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
        <Button primary type="submit">
          {this.props.edit ? "Edit Project" : "Create Project"}
        </Button>
      </form>
    );
  }
}

ProjectForm.propTypes = {
  edit: PropTypes.bool,
  project: PropTypes.object,
  onSubmit: PropTypes.func
};

ProjectForm.defaultProps = {
  edit: false,
  project: {},
  onSubmit: _.noop
};

export default ProjectForm;
