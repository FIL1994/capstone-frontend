import React, { Component } from "react";
import {
  Container,
  Button,
  Form,
  Segment,
  Message,
  Image
} from "semantic-ui-react";
import _ from "lodash";
import { updateAuth, saveAuth } from "helpers/axios";

import { withConsumer } from "components/Context";
import RMS from "../assets/RMS.png";
import { URLS } from "constants/index";
import "./login.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errMsg: ""
  };

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  onSubmit = async () => {
    const auth = {
      username: this.state.username,
      password: this.state.password
    };

    const res = await updateAuth(auth)
      .get(URLS.USER)
      .catch(err => err);

    if (_.isError(res)) {
      if (res.response) {
        if (res.response.status === 401) {
          this.setState({ errMsg: "Incorrect username or password" });
        } else {
          this.setState({ errMsg: res.response.data });
        }
      } else {
        this.setState({ errMsg: res.message });
      }
    } else if (_.isEmpty(res.data.username)) {
      this.setState({ errMsg: "Could not login. Try again later." });
    } else {
      const userDetails = res.data;
      saveAuth(auth);
      this.props.context.actions.setUserDetails(userDetails);
      this.props.history.push(
        this.props.context.state.requestedPage || "/home"
      );
      this.props.context.actions.resetRequestedPage();
    }

    console.log(res);
  };

  render() {
    const { errMsg } = this.state;

    return (
      <Container style={{ margin: "auto", textAlign: "center" }}>
        <div style={{ minHeight: 235 }}>
          <Image
            src={RMS}
            alt="RMS"
            centered
            size="medium"
            style={{
              marginTop: 30
            }}
          />
        </div>
        <Segment textAlign="left" style={{ padding: "8%" }}>
          <Form className="login-form" onSubmit={this.onSubmit}>
            <Form.Input
              placeholder="Username/Email"
              name="username"
              onChange={this.onChange}
              autoFocus
            />
            <Form.Input
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.onChange}
            />
            <Button
              type="submit"
              fluid
              size="big"
              children="Sign In"
              color="vk"
            />
          </Form>
          {errMsg && <Message error content={errMsg} />}
        </Segment>
      </Container>
    );
  }
}

export default withConsumer(Login);
