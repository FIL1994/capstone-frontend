import React, { Component } from "react";
import {
  Container,
  Button,
  Form,
  Icon,
  Segment,
  List
} from "semantic-ui-react";
import axios from "helpers/axios";
import _ from "lodash";
import { URLS } from "constants/urls";
import Toast, { toast } from "components/Toast";

import UserListItem from "./UserListItem";

class Admin extends Component {
  state = {
    users: [],
    userName: "",
    roles: []
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.getUsers();
    this.getRoles();
  }

  getUsers = async () => {
    const res = await axios.get(URLS.USER + "/all");

    const users = (res.data || []).reverse();

    this.setState({
      users
    });
  };

  getRoles = async () => {
    const res = await axios.get(URLS.ROLE);
    this.setState({
      roles: res.data
    });
  };

  addUser = async () => {
    if (_.isEmpty(this.state.userName)) {
      toast.error("You must enter a username to add a user");
      return;
    }

    try {
      await axios.post(URLS.USER, {
        email: this.state.userName,
        password: "password"
      });

      toast.success(
        <div>
          Added user: {this.state.userName}
          <br />Password is password
        </div>
      );

      setTimeout(this.getUsers, 200);
    } catch (e) {
      console.log("error", e);
      window.err = e;
      toast.error("An error occurred");
    }
  };

  render() {
    return (
      <Container>
        <Segment attached="top" secondary>
          <Form onSubmit={this.addUser}>
            <Form.Input
              inverted
              iconPosition="left"
              action
              size="small"
              placeholder="username or email"
            >
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
        <Segment attached>
          <List divided>
            {this.state.users.map(u => (
              <UserListItem key={u.id} u={u} roles={this.state.roles} />
            ))}
          </List>
        </Segment>
        <Toast />
      </Container>
    );
  }
}

export default Admin;
