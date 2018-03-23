import React, { Component, Fragment } from "react";
import { Container, Card, Button } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import Select from "react-virtualized-select";
import Modal from "../../components/Modal";
import { URLS } from "../../constants";

import MaterialForm from "./Material/MaterialForm";

class JobDetails extends Component {
  state = {
    job: {},
    customerModalOpen: false,
    employeeModalOpen: false,
    materialModalOpen: false,
    customers: [],
    employees: [],
    selectedCustomer: "",
    selectedEmployees: []
  };

  getJob = async () =>
    axios
      .get(`${URLS.JOB}/${this.props.match.params.id}`)
      .then(res => this.setState({ job: res.data }))
      .catch(() => this.props.history.push("/job"));

  getCustomers = async () =>
    axios.get(URLS.CUSTOMER).then(res =>
      this.setState({
        customers: res.data.map(c => ({
          label: `${c.firstName} ${c.lastName}`,
          value: c.id
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
    this.getJob();
    this.getCustomers();
    this.getEmployees();
  }

  addCustomer = async e => {
    e.preventDefault();
    const { selectedCustomer } = this.state;

    if (!_.isEmpty(selectedCustomer)) {
      axios
        .put(
          `${URLS.JOB}/${this.props.match.params.id}/customer/${
            selectedCustomer.value
          }`
        )
        .then(res => console.log(res));
    }

    console.log(selectedCustomer);
  };

  addEmployees = async e => {
    e.preventDefault();
    const { selectedEmployees } = this.state;

    if (selectedEmployees.length > 0) {
      Promise.all(
        selectedEmployees.map(e =>
          axios
            .put(
              `${URLS.JOB}/${this.props.match.params.id}/employee/${e.value}`
            )
            .catch(err => console.log(e, err))
        )
      ).then(values => console.log(values));
    }

    console.log(selectedEmployees);
  };

  addMaterial = async newMaterial => {
    const res = await axios
      .put(`${URLS.JOB}/${this.state.job.id}/material`, newMaterial)
      .catch(e => e);

    if (_.isError(res)) {
      console.log(res.response.data);
      return;
    }

    this.setState({
      materialModalOpen: false
    });

    this.getJob();
  };

  editMaterial(id) = async editMaterial => {
    const res = await axios
      .put(`${URLS.JOB}/${this.state.job.id}/material/${id}`, editMaterial)
      .catch(e => e);

    if (_.isError(res)) {
      console.log(res.response.data);
      return;
    }

    this.setState({
      materialModalOpen: false
    });

    this.getJob();
  }

  makeAvailable = async () => {
    await axios.put(`${URLS.JOB}/${this.props.match.params.id}/available`);
  };

  render() {
    const { job } = this.state;

    console.log(job);

    return (
      <Container>
        {!_.isEmpty(job) && (
          <Fragment>
            <div style={{ marginTop: 20 }}>
              {!job.available && (
                <Button primary onClick={this.makeAvailable}>
                  Set as Available
                </Button>
              )}
              <Button
                color="yellow"
                onClick={() => this.setState({ customerModalOpen: true })}
              >
                Add Customer
              </Button>
              <Button
                color="yellow"
                onClick={() => this.setState({ employeeModalOpen: true })}
              >
                Add Employee(s)
              </Button>
              <Button
                color="yellow"
                onClick={() => this.setState({ materialModalOpen: true })}
              >
                Add Material
              </Button>

            </div>
            <Card fluid>
              <Card.Content>
                <label>Description: </label>
                {job.description} <br />
                <label>Available: </label>
                {job.available} <br />
                <label>Date Opened: </label>
                {job.dateOpened} <br />
                <label>Date Closed: </label>
                {job.dateClosed} <br />
                <label>Materials: </label>
                <ul>
                  {job.materials &&
                    _.isArray(job.materials) &&
                    job.materials.map(m => (
                      <li key={m.id}>
                        {m.description} - {m.supplier} - ${m.cost}
                      </li>
                      <Button
                        color="blue"
                        onClick={() => editMaterial(m.id)}
                      >
                        Edit Material
                      </Button>
                      <Button
                        color="blue"
                        onClick={() => { axios.delete(`${URLS.JOB}/${this.state.job.id}/mateiral/${}m.id`) }}
                      >
                        Remove
                      </Button>

                    ))}
                </ul>
              </Card.Content>
            </Card>
          </Fragment>
        )}
        <Modal
          isOpen={this.state.customerModalOpen}
          onRequestClose={() =>
            this.setState({ customerModalOpen: false, selectedCustomer: "" })
          }
        >
          <form onSubmit={this.addCustomer}>
            <Select
              options={this.state.customers}
              onChange={selectedCustomer => this.setState({ selectedCustomer })}
              value={this.state.selectedCustomer}
              placeholder="select a customer"
              style={{ marginBottom: 20 }}
            />
            <Button primary type="submit">
              Add Customer
            </Button>
          </form>
        </Modal>
        <Modal
          isOpen={this.state.employeeModalOpen}
          onRequestClose={() =>
            this.setState({ employeeModalOpen: false, selectedEmployees: [] })
          }
        >
          <form onSubmit={this.addEmployees}>
            <Select
              multi
              options={this.state.employees}
              onChange={selectedEmployees =>
                this.setState({ selectedEmployees })
              }
              value={this.state.selectedEmployees}
              placeholder="select employee(s)"
              style={{ marginBottom: 20 }}
            />
            <Button primary type="submit">
              Add Employee(s)
            </Button>
          </form>
        </Modal>
        <Modal
          isOpen={this.state.materialModalOpen}
          onRequestClose={() => this.setState({ materialModalOpen: false })}
          style={{ minWidth: 350 }}
        >
          <MaterialForm onSubmit={this.addMaterial} />
        </Modal>
      </Container>
    );
  }
}

export default JobDetails;
