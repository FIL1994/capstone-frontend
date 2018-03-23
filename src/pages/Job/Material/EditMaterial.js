import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import MaterialForm from "./MaterialForm";
import { URLS } from "../../constants";

class EditMaterial extends Component {
  state = {
    material: {}
  };

  componentDidMount() {
    axios
      .get(`${URLS.MATERIAL}/${this.props.match.params.id}`)
      .then(res => this.setState({ material: res.data }))
      .catch(() => this.props.history.push("/material"));
  }

  handleSubmit = async newMaterial => {
    await axios.put(
      `${URLS.MATERIAL}/${this.props.match.params.id}`,
      newMaterial
    );

    this.props.history.push("/material");
  };

  render() {
    const { material } = this.state;

    return (
      <Container>
        {!_.isEmpty(material) && (
          <MaterialForm edit material={material} onSubmit={this.handleSubmit} />
        )}
      </Container>
    );
  }
}

export default EditMaterial;
