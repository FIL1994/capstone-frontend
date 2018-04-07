import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";
import _ from "lodash";
import axios from "helpers/axios";
import { Column, SortDirection } from "react-virtualized";
import Table from "components/Table";

import { URLS } from "constants/index";

class Customer extends Component {
  state = {
    customers: [],
    sortBy: "id",
    sortDirection: SortDirection.ASC
  };

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = async () => {
    let customers = (await axios.get(URLS.CUSTOMER)).data;

    customers.map(c => {
      c.name = c.firstName + " " + c.lastName;
      return c;
    });

    this.setState({
      customers
    });
  };

  sortTable = ({ sortBy, sortDirection }) =>
    this.setState({ sortBy, sortDirection });

  render() {
    const { customers, sortBy, sortDirection } = this.state;

    const sortedList = !_.isArray(customers)
      ? []
      : _.orderBy(
          customers,
          sortBy,
          sortDirection === SortDirection.ASC ? "asc" : "desc"
        );

    return (
      <Container>
        <h1>Customers ({sortedList.length})</h1>
        <Divider />
        <Button
          primary
          as={Link}
          to="/customer/create"
          style={{ marginBottom: 20 }}
        >
          Create Customer
        </Button>

        <Table
          data={sortedList}
          onRowClick={({ rowData: { id } }) =>
            this.props.history.push(`/customer/${id}`)
          }
          sort={this.sortTable}
          sortBy={sortBy}
          sortDirection={sortDirection}
        >
          <Column label="ID" dataKey="id" width={60} />
          <Column label="Company" dataKey="companyName" width={200} />
          <Column label="Name" dataKey="name" width={180} />
          <Column
            disableSort
            label="Actions"
            dataKey=""
            width={300}
            cellDataGetter={({ rowData: { id } }) => id}
            cellRenderer={({ cellData: id }) => (
              <Fragment>
                <Button.Group fluid>
                  <Button
                    as={Link}
                    to={`/customer/edit/${id}`}
                    color="yellow"
                    content="Edit"
                    onClick={e => e.stopPropagation()}
                  />
                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      axios
                        .delete(`${URLS.CUSTOMER}/${id}`)
                        .then(() => this.getCustomers())
                        .catch(err => console.log("delete customer", err));
                    }}
                    color="red"
                    content="Delete"
                  />
                </Button.Group>
              </Fragment>
            )}
          />
        </Table>

        {/*customers.map(c => (
          <div key={c.id}>
            {c.firstName} {c.lastName}
            <Button.Group fluid>
              <Button
                as={Link}
                to={`/customer/${c.id}`}
                color="green"
                content="View"
              />
              <Button
                as={Link}
                to={`/customer/edit/${c.id}`}
                color="yellow"
                content="Edit"
              />
              <Button
                onClick={() =>
                  axios
                    .delete(`http://207.148.28.48:3000/customer/${c.id}`)
                    .then(() => this.getCustomers())
                    .catch(err => console.log("delete customer", c, err))
                }
                color="red"
                content="Delete"
              />
            </Button.Group>
            <hr />
          </div>
        ))*/}
      </Container>
    );
  }
}

export default Customer;
