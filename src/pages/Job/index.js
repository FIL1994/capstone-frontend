import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";

import { URLS } from "constants/index";

class Job extends Component {
  state = {
    jobs: [],
    filter: ""
  };

  componentDidMount() {
    this.getJobs();
  }

  getJobs = async () =>
    this.setState({
      jobs: (await axios.get(URLS.JOB)).data
    });

  filterJobs = () => {
    const { jobs, filter } = this.state;

    return jobs.filter(
      (() => {
        switch (filter) {
          case "AVAILABLE":
            return j => j.available === true;
          case "CLOSED":
            return j => !_.isEmpty(j.dateClosed);
          default:
            return j => true;
            break;
        }
      })()
    );
  };

  render() {
    const { jobs, filter } = this.state;

    console.log(jobs);

    return (
      <Container>
        <h1>Jobs</h1>
        <Divider />
        <Button primary as={Link} to="/job/create" style={{ marginBottom: 20 }}>
          Create Job
        </Button>
        <Button.Group>
          <Button
            color={filter === "" ? "black" : "violet"}
            onClick={() => this.setState({ filter: "" })}
            children="All"
          />
          <Button.Or />
          <Button
            color={filter === "AVAILABLE" ? "black" : "violet"}
            onClick={() => this.setState({ filter: "AVAILABLE" })}
            children="Available"
          />
          <Button.Or />
          <Button
            color={filter === "CLOSED" ? "black" : "violet"}
            onClick={() => this.setState({ filter: "CLOSED" })}
            children="Closed"
          />
        </Button.Group>
        {this.filterJobs().map(j => (
          <div key={j.id}>
            {j.description} <br />
            {j.dateOpened || "N/A"} - {j.dateClosed || "Now"}
            <Button.Group fluid>
              <Button
                as={Link}
                to={`/job/${j.id}`}
                color="green"
                content="View"
              />
              <Button
                as={Link}
                to={`/job/edit/${j.id}`}
                color="yellow"
                content="Edit"
              />
              <Button
                onClick={() =>
                  axios
                    .delete(`http://207.148.28.48:3000/job/${j.id}`)
                    .then(() => this.getJobs())
                    .catch(err => console.log("delete job", j, err))
                }
                color="red"
                content="Delete"
              />
            </Button.Group>
            <hr />
          </div>
        ))}
      </Container>
    );
  }
}

export default Job;
