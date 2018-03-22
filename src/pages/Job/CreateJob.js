import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import JobForm from "./JobForm";
import { URLS } from "../../constants";

class CreateJob extends Component {
  
  handleSubmit = async newJob => {
    await axios.post(URLS.JOB, newJob);

    this.props.history.push("/job");
  };

  render() {
    return (
      <Container>
        <JobForm onSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

export default CreateJob;
