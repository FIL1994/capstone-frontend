import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import ProjectForm from "./ProjectForm";
import { URLS } from "../../constants";

class CreateProject extends Component {
  state = {
    msg: ""
  };

  handleSubmit = async newProject => {
    let response = await axios.post(URLS.PROJECT, newProject).catch(e => e);

    if (_.isError(response)) {
      console.log("Create Project Error", response);
      this.setState({
        msg: response.response.data
      });
      return;
    }

    this.props.history.push("/project");
  };

  render() {
    return (
      <Container>
        {this.state.msg && (
          <Segment inverted color="red" children={this.state.msg} />
        )}
        <ProjectForm onSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

export default CreateProject;