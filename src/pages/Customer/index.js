import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";
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
    window.scrollTo(0, 0);

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
        <Button
          primary
          icon="add"
          as={Link}
          to="/customer/create"
          style={{ marginBottom: 20 }}
          content="Add Customer"
        />

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
            dataKey="actions"
            width={120}
            headerClassName="center-cell"
            className="center-cell"
            cellDataGetter={({ rowData: { id } }) => id}
            cellRenderer={({ cellData: id }) => (
              <Fragment>
                <Button
                  as={Link}
                  to={`/customer/edit/${id}`}
                  circular
                  color="vk"
                  icon="edit"
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

export default Customer;
