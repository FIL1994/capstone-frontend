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
import { URLS } from "constants/urls";
import Avatar from "react-avatar";

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

    this.setState({
      users: res.data || []
    });
  };

  addUser = async () => {
    await axios.post(URLS.USER, {
      email: this.state.userName,
      password: "password"
    });

    setTimeout(this.getUsers, 200);
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
          <List celled>
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
      </Container>
    );
  }
}

export default Admin;
