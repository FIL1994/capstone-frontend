import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import _ from "lodash";

import { URLS } from "../../../constants";

class MaterialForm extends Component {
  state = {
    description: "",
    supplier: "",
    cost: "",
    emergencyContact: "",
    id: null,
    ..._.pickBy(this.props.material, _.identity)
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async e => {
    e.preventDefault();

    const { description, supplier, cost, id } = this.state;

    this.props.onSubmit({
      description,
      supplier,
      cost,
      id
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
  onSubmit: PropTypes.func,
  material: PropTypes.object
};

MaterialForm.defaultProps = {
  edit: false,
  onSubmit: _.noop,
  material: {}
};

export default MaterialForm;
