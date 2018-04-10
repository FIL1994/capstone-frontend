import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";
import { Column, SortDirection } from "react-virtualized";
import Table from "components/Table";

import { URLS } from "constants/index";

class Job extends Component {
  state = {
    jobs: [],
    filter: "",
    sortBy: "id",
    sortDirection: SortDirection.ASC
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.getJobs();
  }

  getJobs = async () => {
    let jobs = (await axios.get(URLS.JOB)).data || [];

    jobs.map(j => {
      const p = j.project || {};
      const c = p.customer || {};
      j.projectName = p.description;
      j.customerName = c.companyName;
      return j;
    });

    this.setState({
      jobs
    });
  };

  filterJobs = () => {
    const { jobs, filter } = this.state;

    return jobs.filter(
      (() => {
        switch (filter) {
          case "AVAILABLE":
            return j => j.available === true;
          case "CLOSED":
            return j => !_.isEmpty(j.dateClosed);
          default:
            return j => true;
        }
      })()
    );
  };

  sortTable = ({ sortBy, sortDirection }) =>
    this.setState({ sortBy, sortDirection });

  render() {
    const { filter, sortBy, sortDirection } = this.state;
    const jobs = this.filterJobs();

    const sortedList = !_.isArray(jobs)
      ? []
      : _.orderBy(
          jobs,
          sortBy,
          sortDirection === SortDirection.ASC ? "asc" : "desc"
        );

    return (
      <Container>
        <Button
          primary
          icon="add"
          as={Link}
          to="/job/create"
          style={{ marginBottom: 20 }}
          content="Add Job"
        />

        <Button.Group>
          <Button
            color={filter === "" ? "black" : "violet"}
            onClick={() => this.setState({ filter: "" })}
            children="All"
          />
          <Button.Or />
          <Button
            color={filter === "AVAILABLE" ? "black" : "violet"}
            onClick={() => this.setState({ filter: "AVAILABLE" })}
            children="Available"
          />
          <Button.Or />
          <Button
            color={filter === "CLOSED" ? "black" : "violet"}
            onClick={() => this.setState({ filter: "CLOSED" })}
            children="Closed"
          />
        </Button.Group>

        <Table
          data={sortedList}
          onRowClick={({ rowData: { id } }) =>
            this.props.history.push(`/job/${id}`)
          }
          sort={this.sortTable}
          sortBy={sortBy}
          sortDirection={sortDirection}
        >
          <Column label="ID" dataKey="id" width={60} />
          <Column label="Description" dataKey="description" width={200} />
          <Column label="Date Opened" dataKey="dateOpened" width={150} />
          <Column label="Date Closed" dataKey="dateClosed" width={150} />
          <Column label="Project" dataKey="projectName" width={150} />
          <Column label="Customer" dataKey="customerName" width={150} />
          <Column
            disableSort
            label="Actions"
            dataKey="actions"
            width={120}
            headerClassName="center-cell"
            className="center-cell"
            cellDataGetter={({ rowData: { id } }) => id}
            cellRenderer={({ cellData: id }) => (
              <Fragment>
                <Button
                  as={Link}
                  to={`/job/edit/${id}`}
                  circular
                  color="vk"
                  icon="edit"
                  onClick={e => e.stopPropagation()}
                />
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    axios
                      .delete(`${URLS.JOB}/${id}`)
                      .then(() => this.getJobs())
                      .catch(err => console.log("delete customer", err));
                  }}
                  circular
                  color="red"
                  icon="delete"
                />
              </Fragment>
            )}
          />
        </Table>
      </Container>
    );
  }
}

export default Job;
