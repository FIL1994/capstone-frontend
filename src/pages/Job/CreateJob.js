import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";

import JobForm from "./JobForm";
import { URLS } from "constants/index";

class CreateJob extends Component {
  state = {
    msg: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = async newJob => {
    const res = await axios.post(URLS.JOB, newJob).catch(e => e);

    if (_.isError(res)) {
      console.log("Create Job Error", res, res.response);
      this.setState({
        msg: res.response.data
      });
      return;
    }

    this.props.history.push("/job");
  };

  render() {
    return (
      <Container>
        {this.state.msg && (
          <Segment inverted color="red" children={this.state.msg} />
        )}
        <JobForm onSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

export default CreateJob;
