import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Divider } from "semantic-ui-react";

export default props => (
  <Container>
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
