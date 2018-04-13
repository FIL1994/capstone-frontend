import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";

import JobHoursForm from "./JobHoursForm";
import { URLS } from "constants/index";

class EditJobHours extends Component {
  state = {
    jobHours: {}
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    
    axios
      .get(`${URLS.JOB_HOURS}/${this.props.match.params.id}`)
      .then(res => this.setState({ jobHours: res.data }))
      .catch((e) => this.props.history.push("/jobhours"));
  }

  handleSubmit = async newJobHours => {
    await axios.put(
      `${URLS.JOBHOURS}/${this.props.match.params.id}`,
      newJobHours
    );

    this.props.history.push("/jobhours");
  };

  render() {
    const { jobHours } = this.state;

    return (
      <Container>
        {!_.isEmpty(jobHours) && (
          <JobHoursForm edit jobHours={jobHours} onSubmit={this.handleSubmit} />
        )}
      </Container>
    );
  }
}

export default EditJobHours;
