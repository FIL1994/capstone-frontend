import React, { Component } from "react";
import {
  Container,
  Button,
  Segment,
  Form,
  Message,
  Icon
} from "semantic-ui-react";
import _ from "lodash";

class ChangePassword extends Component {
  state = {
    password: "",
    confirmPassword: "",
    touched: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  getMessage = () => {
    const { touched, password, confirmPassword } = this.state;

    if (!touched || _.isEmpty(confirmPassword)) return;

    return password !== confirmPassword ? (
      <Message attached="bottom" visible warning>
        <Icon name="warning" />
        Passwords do not match
      </Message>
    ) : (
      <Message attached="bottom" visible success>
        <Icon name="check" />
        Passwords match
      </Message>
    );
  };

  render() {
    const { password, confirmPassword } = this.state;
    const message = this.getMessage();

    return (
      <Container>
        <Segment attached="top">
          <Form>
            <Form.Input
              type="password"
              label="New Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <Form.Input
              type="password"
              onFocus={() => {
                if (!this.state.touched) this.setState({ touched: true });
              }}
              label="Re-enter New Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
            />
            <Button primary type="submit">
              Change Password
            </Button>
          </Form>
        </Segment>
        {message}
      </Container>
    );
  }
}

export default ChangePassword;
