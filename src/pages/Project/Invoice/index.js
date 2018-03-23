import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import RMS from "../../../assets/RMS_No_Slogan.png";

class Invoice extends Component {
  render() {
    const { project, jobs } = this.props;

    console.log("jobs for project", jobs);

    return (
      <div>
        <hr />
        <h3>Invoice</h3>
        <img
          src={RMS}
          alt="RMS"
          style={{
            height: 120,
            padding: "5px 0 2px 5px",
            display: "block",
            margin: "auto"
          }}
        />
        <h4>Bill To</h4>
        {project.customer.companyName ||
          (project.customer &&
            project.customer.firstName + " " + project.customer.lastName)}
        <h4>For</h4>
        {project.description}
        <div>{jobs.map(j => j.description)}</div>
      </div>
    );
  }
}

Invoice.propTypes = {
  project: PropTypes.object.isRequired,
  jobs: PropTypes.array
};

export default Invoice;
