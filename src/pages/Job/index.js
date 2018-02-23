import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";
import axios from "axios";

class Job extends Component {
  state = {
    jobs: []
  };

  componentWillMount() {
    (async () => {
      this.setState({
        jobs: (await axios.get("http://207.148.28.48:3000/job")).data
      });
    })();
  }

  render() {
    const { jobs } = this.state;

    console.log(jobs);

    return (
      <Container>
        <h1>Jobs</h1>
        <Divider />
        <Button primary as={Link} to="/job/create" style={{ marginBottom: 20 }}>
          Create Job
        </Button>
        {jobs.map(j => (
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
            </Button.Group>
            <hr />
          </div>
        ))}
      </Container>
    );
  }
}

export default Job;
