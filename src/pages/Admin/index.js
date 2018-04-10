import React, { Component } from "react";
import { Container, Button, Form, Icon, Segment } from "semantic-ui-react";
import axios from "helpers/axios";
import { URLS } from "constants/urls";

class Admin extends Component {
  state = {
    users: [],
    userName: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.getUsers();
  }

  getUsers = async () =>
    this.setState({
      users: (await axios.get(URLS.USER + "/all").data) || []
    });

  render() {
    return (
      <Container>
        <Segment secondary>
          <Form onSubmit={() => console.log("add user")}>
            <Form.Input inverted iconPosition="left" action size="small">
              <Icon name="at" />
              <input
                value={this.state.userName}
                onChange={e => this.setState({ userName: e.target.value })}
              />
              <Button primary type="submit">
                Add User
              </Button>
            </Form.Input>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default Admin;
