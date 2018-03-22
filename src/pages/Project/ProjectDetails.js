import React, { Component, Fragment } from "react";
import { Container, Card, Button } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import Select from "react-virtualized-select";
import Modal from "../../components/Modal";
import { URLS } from "../../constants";

class ProjectDetails extends Component {
  state = {
    project: {}
  };

  componentDidMount() {
    this.getProject();
  }

  getProject = async () =>
    axios
      .get(`${URLS.PROJECT}/${this.props.match.params.id}`)
      .then(res => this.setState({ project: res.data }))
      .catch(() => this.props.history.push("/project"));

  render() {
    const { project } = this.state;

    console.log(project);

    return (
      <Container>
        {!_.isEmpty(project) && (
          <Fragment>
            <Card>
              <Card.Content>
                <label>Description: </label>
                {project.description} <br />
                <label>Customer: </label>
                {project.customer && project.customer.firstName}
                <br />
                <label>Date Opened: </label>
                {project.dateOpened} <br />
                <label>Date Closed: </label>
                {project.dateClosed} <br />
                <Button children="View Invoice" />
              </Card.Content>
            </Card>
          </Fragment>
        )}
      </Container>
    );
  }
}

export default ProjectDetails;