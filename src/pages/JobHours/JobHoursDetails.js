import React, { Component, Fragment } from "react";
import { Container, Card, Button } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import Select from "react-virtualized-select";
import Modal from "../../components/Modal";
import { URLS } from "../../constants";

class JobHoursetails extends Component {
  state = {
    jobHours: {},
    employeeModalOpen: false,
    jobModalOpen: false,
    jobs: [],
    employees: [],
    selectedJob: "",
    selectedEmployee: ""
  };

  getJobHours = async () =>
    axios
      .get(`${URLS.JOBHOURS}/${this.props.match.params.id}`)
      .then(res => this.setState({ jobhours: res.data }))
      .catch(() => this.props.history.push("/jobhours"));

  getJobs = async () =>
    axios.get(URLS.JOB).then(res =>
      this.setState({
        customers: res.data.map(c => ({
          label: `${j.id} ${j.description}`,
          value: j.id
        }))
      })
    );

  getEmployees = async () =>
    axios.get(URLS.EMPLOYEE).then(res =>
      this.setState({
        employees: res.data.map(e => ({
          label: `${e.firstName} ${e.lastName}`,
          value: e.id
        }))
      })
    );


  componentDidMount() {
    this.getJobHours();
    this.getJobs();
    this.getEmployees();
  }

  addJob = async e => {
    e.preventDefault();
    const { selectedJob } = this.state;

    if (!_.isEmpty(selectedJob)) {
      axios
        .put(
          `${URLS.JOB}/${this.props.match.params.id}/job/${e.value}{
            selectedJob.value
          }`
        )
        .then(res => console.log(res));
    }

    console.log(selectedJob);
  };
  
  addEmployee = async e => {
    e.preventDefault();
    const { selectedEmployee } = this.state;

    if (!_.isEmpty(selectedEmployee)) {
      axios
        .put(
          `${URLS.JOB}/${this.props.match.params.id}/employee/${e.value}{
            selectedEmployee.value
          }`
        )
        .then(res => console.log(res));
    }

    console.log(selectedEmployee);
  };


  render() {
    const { jobHours } = this.state;

    console.log(jobHours);

    return (
      <Container>
        {!_.isEmpty(job) && (
          <Fragment>
            <div style={{ marginTop: 20 }}>
              <Button
                color="yellow"
                onClick={() => this.setState({ jobModalOpen: true })}
              >
                Add Job
              </Button>
              <Button
                color="yellow"
                onClick={() => this.setState({ employeeModalOpen: true })}
              >
                Add Employee
              </Button>
            </div>
            <Card>
              <Card.Content>
                <label>Date: </label>
                {jobHours.date} <br />
                <label>Description: </label>
                {jobHours.description} <br />
                <label>Hours: </label>
                {jobHours.hours} <br />
                <label>Overtime: </label>
                {jobHours.overtime} <br />
                <label>Doubletime: </label>
                {jobHours.doubletime} <br />
              </Card.Content>
            </Card>
          </Fragment>
        )}
        <Modal
          isOpen={this.state.jobModalOpen}
          onRequestClose={() =>
            this.setState({ jobModalOpen: false, selectedJob: "" })
          }
          children={"job modal"}
        >
          <form onSubmit={this.addJob}>
            <Select
              options={this.state.jobs}
              onChange={selectedJob => this.setState({ selectedJob })}
              value={this.state.selectedJob}
              placeholder="select a job"
              style={{ marginBottom: 20 }}
            />
            <Button primary type="submit">
              Add Job
            </Button>
          </form>
        </Modal>
        <Modal
          isOpen={this.state.employeeModalOpen}
          onRequestClose={() =>
            this.setState({ employeeModalOpen: false, selectedEmployee: "" })
          }
          children={"employee modal"}
        >
          <form onSubmit={this.addEmployee}>
            <Select
              options={this.state.employee}
              onChange={selectedEmployee => this.setState({ selectedEmployee })}
              value={this.state.selectedEmployee}
              placeholder="select employee"
              style={{ marginBottom: 20 }}
            />
            <Button primary type="submit">
              Add Employee
            </Button>
          </form>
        </Modal>
      </Container>
    );
  }
}

export default JobHoursDetails;
