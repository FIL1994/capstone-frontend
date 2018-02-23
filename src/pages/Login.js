import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";

import RMS from "../assets/RMS_No_Slogan.png";

export default props => (
  <Container style={{margin: "auto", textAlign: "center"}}>
    <img
      src={RMS}
      alt="RMS"
      style={{ height: 250, padding: "5px 0 2px 5px", display: "block", margin: "auto" }}
    />
    <h2>Capstone Project (Title TBD)</h2>
    <Button
      fluid
      as={Link}
      to="/home"
      size="massive"
      children="Login"
      color="vk"
      style={{ marginTop: "1%" }}
    />
  </Container>
);
