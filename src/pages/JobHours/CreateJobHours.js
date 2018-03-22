import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import JobHoursForm from "./JobHoursForm";

class CreateJobHours extends Component {
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async newJobHours => {
    await axios.post("http://207.148.28.48:3000/jobhours", newJobHours);

    this.props.history.push("/jobhours");
  };

  render() {
    return (
      <Container>
        <JobHoursForm onSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

export default CreateJobHours;
