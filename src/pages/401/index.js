import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";

export default props => (
  <Container style={{ margin: "auto", textAlign: "center" }}>
    <h2>Not Authorized</h2>
    <Button as={Link} to="/" primary size="large" children="Sign In" />
  </Container>
);
