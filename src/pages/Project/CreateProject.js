import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import ProjectForm from "./ProjectForm";
import { URLS } from "../../constants";

class CreateProject extends Component {
  handleSubmit = async newProject => {
    await axios.post(URLS.PROJECT, newProject);

    this.props.history.push("/project");
  };

  render() {
    return (
      <Container>
        <ProjectForm onSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

export default CreateProject;
