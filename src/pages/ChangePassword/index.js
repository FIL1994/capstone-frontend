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
import axios from "helpers/axios";
import { URLS } from "constants/urls";
import Toast, { toast } from "components/Toast";

class ChangePassword extends Component {
  state = {
    password: "",
    confirmPassword: "",
    touched: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  onSubmit = async () => {
    const { password, confirmPassword } = this.state;

    if (_.isEmpty(password)) {
      toast.error("You must enter a password");
      return;
    } else if (_.isEmpty(confirmPassword)) {
      toast.error("Please confirm your password");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Your passwords do not match");
      return;
    }

    try {
      await axios.put(URLS.USER, { password });
    } catch (e) {
      toast.error("An error occurred");
      return;
    }

    toast.success("Successfully changed password");
  };

  getMessage = () => {
    const { touched, password, confirmPassword } = this.state;

    if (!touched) return;

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
          <Form onSubmit={this.onSubmit}>
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
        <Toast />
      </Container>
    );
  }
}

export default ChangePassword;
