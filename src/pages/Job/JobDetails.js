import React, { Component, Fragment } from "react";
import { Container, Card, Button } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import Select from "react-virtualized-select";
import Modal from "../../components/Modal";

class JobDetails extends Component {
  state = {
    job: {},
    customerModalOpen: false,
    employeeModalOpen: false,
    customers: [],
    employees: [],
    selectedCustomer: "",
    selectedEmployees: []
  };

  componentDidMount() {
    axios
      .get(`http://207.148.28.48:3000/job/${this.props.match.params.id}`)
      .then(res => this.setState({ job: res.data }))
      .catch(() => this.props.history.push("/job"));

    axios.get(`http://207.148.28.48:3000/customer`).then(res =>
      this.setState({
        customers: res.data.map(c => ({
          label: `${c.firstName} ${c.lastName}`,
          value: c.id
        }))
      })
    );

    axios.get(`http://207.148.28.48:3000/employee`).then(res =>
      this.setState({
        employees: res.data.map(e => ({
          label: `${e.firstName} ${e.lastName}`,
          value: e.id
        }))
      })
    );
  }

  addCustomer = async e => {
    e.preventDefault();
    const { selectedCustomer } = this.state;

    if (!_.isEmpty(selectedCustomer)) {
      axios
        .put(
          `http://207.148.28.48:3000/job/${
            this.props.match.params.id
          }/customer/${selectedCustomer.value}`
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
              `http://207.148.28.48:3000/job/${
                this.props.match.params.id
              }/employee/${e.value}`
            )
            .catch(err => console.log(e, err))
        )
      ).then(values => console.log(values));
    }

    console.log(selectedEmployees);
  };

  render() {
    const { job } = this.state;

    console.log(job);

    return (
      <Container>
        {!_.isEmpty(job) && (
          <Fragment>
            <div style={{ marginTop: 20 }}>
              <Button
                primary
                onClick={() => this.setState({ customerModalOpen: true })}
              >
                Add Customer
              </Button>
              <Button
                primary
                onClick={() => this.setState({ employeeModalOpen: true })}
              >
                Add Employee(s)
              </Button>
            </div>
            <Card>
              <Card.Content>
                <label>Description: </label>
                {job.description} <br />
                <label>Available: </label>
                {job.available} <br />
                <label>Date Opened: </label>
                {job.dateOpened} <br />
                <label>Date Closed: </label>
                {job.dateClosed} <br />
              </Card.Content>
            </Card>
          </Fragment>
        )}
        <Modal
          isOpen={this.state.customerModalOpen}
          onRequestClose={() =>
            this.setState({ customerModalOpen: false, selectedCustomer: "" })
          }
          children={"customer modal"}
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
          children={"employee modal"}
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
      </Container>
    );
  }
}

export default JobDetails;
