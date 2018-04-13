import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";
import { Column, SortDirection } from "react-virtualized";
import Table from "components/Table";

import { URLS } from "constants/index";

class JobHours extends Component {
  state = {
    jobHours: [],
    sortBy: "id",
    sortDirection: SortDirection.ASC
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.getJobHours();
  }

  getJobHours = async () =>
    this.setState({
      jobHours: (await axios.get(URLS.JOB_HOURS)).data
    });

  sortTable = ({ sortBy, sortDirection }) =>
    this.setState({ sortBy, sortDirection });

  render() {
    const { jobHours, sortBy, sortDirection } = this.state;

    const sortedList = !_.isArray(jobHours)
      ? []
      : _.orderBy(
          jobHours,
          sortBy,
          sortDirection === SortDirection.ASC ? "asc" : "desc"
        );

    return (
      <Container>
        <Button
          primary
          icon="add"
          as={Link}
          to="/jobhours/create"
          style={{ marginBottom: 20 }}
          content="Add Hours"
        />

        <Table
          data={sortedList}
          onRowClick={({ rowData: { id } }) =>
            this.props.history.push(`/jobhours/${id}`)
          }
          sort={this.sortTable}
          sortBy={sortBy}
          sortDirection={sortDirection}
        >
          <Column label="ID" dataKey="id" width={60} />
          <Column label="Description" dataKey="description" width={180} />
          <Column label="Date" dataKey="date" width={60} />
          <Column label="Hours" dataKey="hours" width={60} />
          <Column label="Double Time" dataKey="doubleTime" width={120} />
          <Column label="Over Time" dataKey="overTime" width={120} />
          <Column
            disableSort
            label="Actions"
            dataKey="action"
            width={120}
            headerClassName="center-cell"
            className="center-cell"
            cellDataGetter={({ rowData: { id } }) => id}
            cellRenderer={({ cellData: id }) => (
              <Fragment>
                <Button
                  as={Link}
                  to={`/jobhours/edit/${id}`}
                  circular
                  color="vk"
                  icon="edit"
                  onClick={e => e.stopPropagation()}
                />
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    axios
                      .delete(`${URLS.JOB_HOURS}/${id}`)
                      .then(() => this.getJobHours())
                      .catch(err => console.log("delete job hours", err));
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

export default JobHours;
