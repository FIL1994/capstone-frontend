import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import { URLS } from "../../constants";

class Project extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    this.getProjects();
  }

  getProjects = async () =>
    this.setState({
      projects: (await axios.get(URLS.PROJECT)).data
    });

  render() {
    const { projects } = this.state;

    console.log(projects);

    return (
      <Container>
        <h1>Projects</h1>
        <Divider />
        <Button
          primary
          as={Link}
          to="/project/create"
          style={{ marginBottom: 20 }}
        >
          Create Project
        </Button>
        {projects.map(p => (
          <div key={p.id}>
            {p.description} <br />
            {p.dateOpened || "N/A"} - {p.dateClosed || "Now"}
            <Button.Group fluid>
              <Button
                as={Link}
                to={`/project/${p.id}`}
                color="green"
                content="View"
              />
              <Button
                as={Link}
                to={`/project/edit/${p.id}`}
                color="yellow"
                content="Edit"
              />
              <Button
                onClick={() =>
                  axios
                    .delete(`${URLS.PROJECT}/${p.id}`)
                    .then(() => this.getProjects())
                    .catch(err => console.log("delete project", p, err))
                }
                color="red"
                content="Delete"
              />
            </Button.Group>
          </div>
        ))}
      </Container>
    );
  }
}

export default Project;
