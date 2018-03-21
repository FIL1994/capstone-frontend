import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import ProjectForm from "./ProjectForm";
import { URLS } from "../../constants";

class EditProject extends Component {
  render() {
    return (
      <Container>
        <ProjectForm />
      </Container>
    );
  }
}

export default EditProject;
