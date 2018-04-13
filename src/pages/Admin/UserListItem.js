import React, { Component } from "react";
import { Button, List, Popup } from "semantic-ui-react";
import Avatar from "react-avatar";

class UserListItem extends Component {
  state = {
    edit: false
  };

  render() {
    const { u } = this.props;

    return (
      <List.Item>
        <div style={{ float: "right" }}>
          <Popup
            inverted
            trigger={<Button circular color="vk" icon="edit" />}
            content="edit roles"
          />
          <Popup
            inverted
            trigger={<Button circular color="teal" icon="privacy" />}
            content="reset password"
          />
        </div>
        <Avatar round name={u.email} size={40} textSizeRatio={2.5} />
        <span style={{ marginLeft: 20 }}>{u.email}</span>
        <List
          horizontal
          size="small"
          style={{ marginLeft: 60, display: "block", marginBottom: 5 }}
        >
          {u.roles &&
            u.roles.map(r => <List.Item key={r.id}>{r.role}</List.Item>)}
        </List>
      </List.Item>
    );
  }
}

export default UserListItem;
