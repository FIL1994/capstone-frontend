import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import ProjectForm from "./ProjectForm";
import { URLS } from "../../constants";

class CreateProject extends Component {
  render() {
    return (
      <Container>
        <ProjectForm />
      </Container>
    );
  }
}

export default CreateProject;
