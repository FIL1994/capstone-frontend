import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import ProjectForm from "./ProjectForm";
import { URLS } from "constants/index";

class CreateProject extends Component {
  state = {
    msg: ""
  };

  handleSubmit = async newProject => {
    const res = await axios.post(URLS.PROJECT, newProject).catch(e => e);

    if (_.isError(res)) {
      console.log("Create Project Error", res, res.response);
      this.setState({
        msg: res.response.data
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
