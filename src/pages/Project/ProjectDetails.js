import React, { Component, Fragment } from "react";
import { Container, Card, Button } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import Select from "react-virtualized-select";
import Modal from "../../components/Modal";

class ProjectDetails extends Component {
  state = {
    project: {}
  };

  componentDidMount() {
    this.getProject();
  }

  getProject = async () => {};

  render() {
    return <Container>project details</Container>;
  }
}

export default ProjectDetails;
