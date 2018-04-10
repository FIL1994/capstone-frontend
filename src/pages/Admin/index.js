import React, { Component } from "react";
import { Container, Button, Form, Icon, Segment } from "semantic-ui-react";

class Admin extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Container>
        <Segment secondary>
          <Form>
            <Form.Input inverted iconPosition="left" action size="small">
              <Icon name="at" />
              <input />
              <Button primary type="submit">
                Add User
              </Button>
            </Form.Input>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default Admin;
