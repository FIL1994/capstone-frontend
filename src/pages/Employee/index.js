import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";
import { Column, SortDirection } from "react-virtualized";
import Table from "components/Table";

import { URLS } from "constants/index";

class Employee extends Component {
  state = {
    employees: [],
    sortBy: "id",
    sortDirection: SortDirection.ASC
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    
    this.getEmployees();
  }

  getEmployees = async () => {
    let employees = (await axios.get(URLS.EMPLOYEE)).data || [];

    employees.map(e => {
      e.name = e.firstName + " " + e.lastName;
      return e;
    });

    this.setState({
      employees
    });
  };

  sortTable = ({ sortBy, sortDirection }) =>
    this.setState({ sortBy, sortDirection });

  render() {
    const { employees, sortBy, sortDirection } = this.state;

    const sortedList = !_.isArray(employees)
      ? []
      : _.orderBy(
          employees,
          sortBy,
          sortDirection === SortDirection.ASC ? "asc" : "desc"
        );

    return (
      <Container>
        <Button
          primary
          icon="add"
          as={Link}
          to="/employee/create"
          style={{ marginBottom: 20 }}
          content="Add Employee"
        />

        <Table
          data={sortedList}
          onRowClick={({ rowData: { id } }) =>
            this.props.history.push(`/employee/${id}`)
          }
          sort={this.sortTable}
          sortBy={sortBy}
          sortDirection={sortDirection}
        >
          <Column label="ID" dataKey="id" width={60} />
          <Column label="Name" dataKey="name" width={180} />
          <Column label="Email" dataKey="email" width={150} />
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
                  to={`/employee/edit/${id}`}
                  circular
                  color="vk"
                  icon="edit"
                  onClick={e => e.stopPropagation()}
                />
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    axios
                      .delete(`${URLS.EMPLOYEE}/${id}`)
                      .then(() => this.getEmployees())
                      .catch(err => console.log("delete employee", err));
                  }}
                  circular
                  color="red"
                  icon="delete"
                />
              </Fragment>
            )}
          />
        </Table>

        {/*employees.map(e => (
          <div key={e.id}>
            {e.firstName} {e.lastName} <br />
            {e.email}
            <Button.Group fluid>
              <Button
                as={Link}
                to={`/employee/${e.id}`}
                color="green"
                content="View"
              />
              <Button
                as={Link}
                to={`/employee/edit/${e.id}`}
                color="yellow"
                content="Edit"
              />
            </Button.Group>
            <hr />
          </div>
        ))*/}
      </Container>
    );
  }
}

export default Employee;
