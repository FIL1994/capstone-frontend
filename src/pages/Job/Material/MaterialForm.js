import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import { URLS } from "../../../constants";

class MaterialForm extends Component {
  state = {
    description: "",
    supplier: "",
    cost: ""
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async e => {
    e.preventDefault();

    const { description, supplier, cost } = this.state;

    this.props.onSubmit({
      description,
      supplier,
      cost
    });
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
          label="Supplier"
          name="supplier"
          value={this.state.supplier}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        />
        <Form.Input
          fluid
          label="Cost"
          name="cost"
          value={this.state.cost}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        />
        <Button primary type="submit">
          {this.props.edit ? "Update Material" : "Add Material"}
        </Button>
      </form>
    );
  }
}

MaterialForm.propTypes = {
  edit: PropTypes.bool,
  nSubmit: PropTypes.func
};

MaterialForm.defaultProps = {
  edit: false,
  onSubmit: _.noop
};

export default MaterialForm;
