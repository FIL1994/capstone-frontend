import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import Select from "react-virtualized-select";
import moment from "moment";

import DatePicker from "components/DatePicker";
import { URLS } from "../../constants";

class JobHoursForm extends Component {
  state = {
    date: "",
    description: "",
    ..._.pickBy(this.props.jobHours, _.identity),
    jobs: [],
    employees: [],
    selectedJob: [],
    selectedEmployee: []
  };

  componentDidMount() {
    axios.get(URLS.JOB).then(res =>
      this.setState({
        jobs: res.data.map(j => ({
          label: `${j.id} ${j.description}`,
          value: j.id
        }))
      })
    );

    axios.get(URLS.EMPLOYEE).then(res =>
      this.setState({
        employees: res.data.map(e => ({
          label: `${e.firstName} ${e.lastName}`,
          value: e.id
        }))
      })
    );
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async e => {
    e.preventDefault();

    const { date, description, hours, overtime, doubletime } = this.state;

    console.log("submit job hours", this.state);

    this.props.onSubmit({
      date,
      description,
      hours,
      overtime,
      doubletime
    });
  };

  render() {
    const { date, description, hours, overtime, doubletime } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field" style={{ marginBottom: 20 }}>
          <label>Date</label>
          <DatePicker
            onDateChange={date =>
              date && this.setState({ date: date.format() })
            }
            initialDate={moment(date)}
          />
        </div>
        <Form.Input
          fluid
          label="Description"
          name="description"
          value={description}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        />
        <Form.Input
          fluid
          label="Hours"
          name="hours"
          value={hours}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        />
        <Form.Input
          fluid
          label="Overtime"
          name="overtime"
          value={overtime}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        />
        <Form.Input
          fluid
          label="Doubletime"
          name="doubletime"
          value={doubletime}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        />
        <label>Job</label>
        <Select
          options={this.state.jobs}
          onChange={selectedJob => this.setState({ selectedJob })}
          value={this.state.selectedJob}
          placeholder="select a job"
          style={{ marginBottom: 20 }}
        />
        <label>Employee</label>
        <Select
          options={this.state.employees}
          onChange={selectedEmployee => this.setState({ selectedEmployee })}
          value={this.state.selectedEmployee}
          placeholder="select employee"
          style={{ marginBottom: 20 }}
        />
        <Button primary type="submit">
          Create Job Hours
        </Button>
      </form>
    );
  }
}

JobHoursForm.propTypes = {
  edit: PropTypes.bool,
  job: PropTypes.object,
  employee: PropTypes.object,
  onSubmit: PropTypes.func
};

JobHoursForm.defaultProps = {
  edit: false,
  job: {},
  employee: {},
  onSubmit: _.noop
};

export default JobHoursForm;
