import React, { Component, Fragment } from "react";
import { Container, Card, Button } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";
import Select from "react-virtualized-select";
import Modal from "../../components/Modal";
import { URLS } from "constants/index";

import Invoice from "./Invoice";

class ProjectDetails extends Component {
  state = {
    project: {},
    jobs: []
  };

  componentDidMount() {
    this.getProject();
    this.getJobsForProject(this.props.match.params.id);
  }

  getProject = async () =>
    axios
      .get(`${URLS.PROJECT}/${this.props.match.params.id}`)
      .then(res => this.setState({ project: res.data }))
      .catch(() => this.props.history.push("/project"));

  getJobsForProject = async projectId =>
    axios
      .get(`${URLS.PROJECT}/${projectId}/jobs`)
      .then(res => this.setState({ jobs: res.data }))
      .catch(err => console.log("error gettings jobs for project", err));

  render() {
    const { project, jobs } = this.state;

    console.log(project);

    return (
      <Container>
        {!_.isEmpty(project) && (
          <Fragment>
            <Card fluid>
              <Card.Content>
                <label>Description: </label>
                {project.description} <br />
                <label>Customer: </label>
                {project.customer &&
                  project.customer.firstName + " " + project.customer.lastName}
                <br />
                <label>Date Opened: </label>
                {project.dateOpened} <br />
                <label>Date Closed: </label>
                {project.dateClosed} <br />
                {/* <Button children="View Invoice" /> */}
              </Card.Content>
            </Card>
            <Invoice project={project} jobs={jobs} />
          </Fragment>
        )}
      </Container>
    );
  }
}

export default ProjectDetails;
