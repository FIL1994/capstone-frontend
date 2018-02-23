import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import JobForm from "./JobForm";

class CreateJob extends Component {
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async newJob => {
    await axios.post("http://207.148.28.48:3000/job", newJob);

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
