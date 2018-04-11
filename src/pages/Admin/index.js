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

  getUsers = async () => {
    const res = await axios.get(URLS.USER + "/all");
    console.log("get users", res);

    this.setState({
      users: res.data || []
    });
  };

  render() {
    console.log(this.state);

    return (
      <Container>
        <Segment secondary>
          <Form
            onSubmit={() =>
              axios.post(URLS.USER, {
                email: this.state.userName,
                password: "password"
              })
            }
          >
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
          {this.state.users.map(u => <div key={u.id}>{u.email}</div>)}
        </Segment>
      </Container>
    );
  }
}

export default Admin;
