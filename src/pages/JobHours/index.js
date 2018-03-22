import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";
import axios from "axios";

class JobHours extends Component {
  state = {
    jobHours: [],
  };

  componentDidMount() {
    this.getJobHours();
  }

  getJobHours = async () =>
    this.setState({
      jobHours: (await axios.get("http://207.148.28.48:3000/jobhours")).data
    });

  render() {
    const { jobHours } = this.state;

    console.log(jobHours);

    return (
      <Container>
        <h1>Hours</h1>
        <Divider />
        <Button
          primary
          as={Link}
          to="/jobHours/create"
          style={{ marginBottom: 20 }}
        >
          Add Hours
        </Button>
        {jobHours.map(j => (
          <div key={j.id}>
            {j.date} {j.description} {j.hours} {j.overtime} {j.doubletime}
            <Link
              to={`/job/${j.job.id}`}
              color="blue">
              Job
            </Link>
            <Link
              to={`/employee/${j.employee.id}`}
              color="blue">
              Employee
            </Link>
            <Button.Group fluid>
              <Button
                as={Link}
                to={`/jobhours/${j.id}`}
                color="green"
                content="View"
              />
            <Button.Group fluid>
              <Button
                as={Link}
                to={`/jobhours/edit/${j.id}`}
                color="yellow"
                content="Edit"
              />
              <Button
                onClick={() =>
                  axios
                    .delete(`http://207.148.28.48:3000/jobhours/${j.id}`)
                    .then(() => this.getJobHours())
                    .catch(err => console.log("delete jobHours", c, err))
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

export default JobHours;
