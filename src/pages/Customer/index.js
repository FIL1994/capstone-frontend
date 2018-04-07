import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";
import axios from "helpers/axios";
import { Column, Table } from "react-virtualized";

import { URLS } from "constants/index";

class Customer extends Component {
  state = {
    customers: []
  };

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = async () =>
    this.setState({
      customers: (await axios.get(URLS.CUSTOMER)).data
    });

  render() {
    const { customers } = this.state;

    console.log(customers);

    return (
      <Container>
        <h1>Customers</h1>
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
          width={800}
          height={600}
          headerHeight={20}
          rowHeight={30}
          rowCount={customers.length}
          rowGetter={({ index }) => customers[index]}
        >
          <Column label="ID" dataKey="id" width={60} />
          <Column label="Company" dataKey="companyName" width={200} />
          <Column
            label="Name"
            dataKey=""
            width={180}
            cellDataGetter={({ rowData: { firstName, lastName } }) =>
              `${firstName} ${lastName}`
            }
          />
          <Column
            label="Actions"
            dataKey="id"
            width={200}
            cellRenderer={({ cellData: id }) => (
              <Fragment>
                <Button.Group fluid>
                  <Button
                    as={Link}
                    to={`/customer/${id}`}
                    color="green"
                    content="View"
                  />
                  <Button
                    as={Link}
                    to={`/customer/edit/${id}`}
                    color="yellow"
                    content="Edit"
                  />
                  <Button
                    onClick={() =>
                      axios
                        .delete(`${URLS.CUSTOMER}/${id}`)
                        .then(() => this.getCustomers())
                        .catch(err => console.log("delete customer", err))
                    }
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
