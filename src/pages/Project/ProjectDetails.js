import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";
import { URLS } from "constants/index";

import Invoice from "./Invoice";

class ProjectDetails extends Component {
  state = {
    project: {},
    jobs: []
  };

  componentDidMount() {
    window.scrollTo(0, 0);

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
    const { id } = this.props.match.params;

    console.log(project);

    return (
      <Container>
        {!_.isEmpty(project) && (
          <Fragment>
            <Card fluid>
              <Card.Content>
                <span style={{ float: "right" }}>
                  <Button
                    as={Link}
                    to={`/project/edit/${id}`}
                    circular
                    color="vk"
                    icon="edit"
                    onClick={e => e.stopPropagation()}
                  />
                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      axios
                        .delete(`${URLS.PROJECT}/${id}`)
                        .then(() => this.props.push("/project"))
                        .catch(err => console.log("delete project", err));
                    }}
                    circular
                    color="red"
                    icon="delete"
                  />
                </span>
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
