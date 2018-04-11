import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";
import { Column, SortDirection } from "react-virtualized";
import Table from "components/Table";
import download from "downloadjs";

import { URLS } from "../../constants";

class Project extends Component {
  state = {
    projects: [],
    sortBy: "id",
    sortDirection: SortDirection.ASC
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.getProjects();
  }

  getProjects = async () => {
    let projects = (await axios.get(URLS.PROJECT)).data || [];

    projects.map(p => {
      const c = p.customer || {};
      p.customerName = c.companyName;
      return p;
    });

    this.setState({
      projects
    });
  };

  sortTable = ({ sortBy, sortDirection }) =>
    this.setState({ sortBy, sortDirection });

  render() {
    const { projects, sortBy, sortDirection } = this.state;

    const sortedList = !_.isArray(projects)
      ? []
      : _.orderBy(
          projects,
          sortBy,
          sortDirection === SortDirection.ASC ? "asc" : "desc"
        );

    return (
      <Container>
        <Button
          primary
          icon="add"
          as={Link}
          to="/project/create"
          style={{ marginBottom: 20 }}
          content="Add Project"
        />
        <Button
          primary
          icon="download"
          onClick={async () =>
            download(
              await axios.get(URLS.PROJECT + "/csv", {
                responseType: "blob"
              }).data,
              "projects.csv"
            )
          }
          style={{ marginBottom: 20 }}
          content="Export as CSV"
        />

        <Table
          data={sortedList}
          onRowClick={({ rowData: { id } }) =>
            this.props.history.push(`/project/${id}`)
          }
          sort={this.sortTable}
          sortBy={sortBy}
          sortDirection={sortDirection}
        >
          <Column label="ID" dataKey="id" width={60} />
          <Column label="Description" dataKey="description" width={200} />
          <Column label="Date Opened" dataKey="dateOpened" width={150} />
          <Column label="Date Closed" dataKey="dateClosed" width={150} />
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
                  to={`/project/edit/${id}`}
                  circular
                  color="vk"
                  icon="edit"
                  onClick={e => e.stopPropagation()}
                />
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    axios
                      .delete(`${URLS.PROJECT}/${id}`)
                      .then(() => this.getProjects())
                      .catch(err => console.log("delete project", err));
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

export default Project;
