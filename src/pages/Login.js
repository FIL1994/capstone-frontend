import React, { Component } from "react";
import { Container, Button, Divider, Form, Segment } from "semantic-ui-react";
import _ from "lodash";
import axios, { updateAuth, saveAuth } from "helpers/axios";

import RMS from "../assets/RMS_No_Slogan.png";
import { URLS } from "constants/index";
import "./login.css";

class Login extends Component {
  state = {
    username: "",
    password: ""
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
    } else if (_.isEmpty(res.data.username)) {
    } else {
      const userDetails = res.data;
      saveAuth(auth);
      this.props.history.push("/home");
    }

    console.log(res);
  };

  render() {
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
        </Segment>
      </Container>
    );
  }
}

export default Login;
