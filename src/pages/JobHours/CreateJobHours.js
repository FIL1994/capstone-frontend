import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "helpers/axios";

import JobHoursForm from "./JobHoursForm";
import { URLS } from "constants/index";

class CreateJobHours extends Component {
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async newJobHours => {
    await axios.post(URLS.JOB_HOURS, newJobHours);

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
