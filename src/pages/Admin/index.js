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
import Avatar from "react-avatar";
import { ToastContainer, toast } from "react-toastify";

class Admin extends Component {
  state = {
    users: [],
    userName: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.getUsers();
  }

  getUsers = async () => {
    const res = await axios.get(URLS.USER + "/all");

    const users = (res.data || []).reverse();

    this.setState({
      users
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
        <Segment secondary>
          <Form onSubmit={this.addUser}>
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
        <Segment>
          <List divided>
            {this.state.users.map(u => (
              <List.Item key={u.id}>
                <Avatar round name={u.email} size={40} textSizeRatio={2.5} />
                <span style={{ marginLeft: 20 }}>{u.email}</span>
                <List
                  horizontal
                  size="small"
                  style={{ marginLeft: 60, display: "block", marginBottom: 5 }}
                >
                  {u.roles &&
                    u.roles.map(r => (
                      <List.Item key={r.id}>{r.role}</List.Item>
                    ))}
                </List>
              </List.Item>
            ))}
          </List>
        </Segment>
        <ToastContainer
          className="my-toast"
          position={toast.POSITION.BOTTOM_CENTER}
          autoClose={5000}
        />
      </Container>
    );
  }
}

export default Admin;
