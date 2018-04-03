import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

import JobForm from "./JobForm";
import { URLS } from "constants/index";

class EditJob extends Component {
  state = {
    job: {},
    msg: ""
  };

  componentDidMount() {
    axios
      .get(`${URLS.JOB}/${this.props.match.params.id}`)
      .then(res => this.setState({ job: res.data }))
      .catch(() => this.props.history.push("/job"));
  }

  handleSubmit = async newJob => {
    const res = await axios
      .put(`${URLS.JOB}/${this.props.match.params.id}`, newJob)
      .catch(e => e);

    if (_.isError(res)) {
      console.log("Edit Job Error", res, res.response);
      this.setState({
        msg: res.response.data
      });
      return;
    }

    this.props.history.push("/job");
  };

  render() {
    const { job } = this.state;

    return (
      <Container>
        {this.state.msg && (
          <Segment inverted color="red" children={this.state.msg} />
        )}
        {!_.isEmpty(job) && (
          <JobForm edit job={job} onSubmit={this.handleSubmit} />
        )}
      </Container>
    );
  }
}

export default EditJob;
