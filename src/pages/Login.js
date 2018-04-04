import React, { Component } from "react";
import {
  Container,
  Button,
  Divider,
  Form,
  Segment,
  Message
} from "semantic-ui-react";
import _ from "lodash";
import axios, { updateAuth, saveAuth } from "helpers/axios";

import { withConsumer } from "components/Context";
import RMS from "../assets/RMS_No_Slogan.png";
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
    console.log(this.props, this.state);
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
      this.props.history.push("/home");
    }

    console.log(res);
  };

  render() {
    const { errMsg } = this.state;

    return (
      <Container style={{ margin: "auto", textAlign: "center" }}>
        <img
          src={RMS}
          alt="RMS"
          style={{
            height: 250,
            padding: "5px 0 2px 5px",
            display: "block",
            margin: "auto"
          }}
        />
        <Segment textAlign="left" style={{ padding: "8%" }}>
          <Form className="login-form" onSubmit={this.onSubmit}>
            <Form.Input
              placeholder="Username/Email"
              name="username"
              onChange={this.onChange}
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
