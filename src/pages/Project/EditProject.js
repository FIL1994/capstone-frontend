import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import ProjectForm from "./ProjectForm";
import { URLS } from "../../constants";

class EditProject extends Component {
  state = {
    project: {},
    msg: ""
  };

  componentDidMount() {
    axios
      .get(`${URLS.PROJECT}/${this.props.match.params.id}`)
      .then(res => this.setState({ project: res.data }))
      .catch(() => this.props.history.push("/project"));
  }

  handleSubmit = async newProject => {
    const res = await axios
      .put(`${URLS.PROJECT}/${this.props.match.params.id}`, newProject)
      .catch(e => e);

    if (_.isError(res)) {
      console.log("Edit Project Error", res, res.response);
      this.setState({
        msg: res.response.data
      });
      return;
    }

    this.props.history.push("/project");
  };

  render() {
    const { project } = this.state;

    return (
      <Container>
        {this.state.msg && (
          <Segment inverted color="red" children={this.state.msg} />
        )}
        {!_.isEmpty(project) && (
          <ProjectForm edit project={project} onSubmit={this.handleSubmit} />
        )}
      </Container>
    );
  }
}

export default EditProject;
