import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, List, Popup } from "semantic-ui-react";
import Avatar from "react-avatar";
import Select from "react-virtualized-select";

class UserListItem extends Component {
  state = {
    edit: false,
    selectedRoles: []
  };

  render() {
    const { u, roles } = this.props;
    const { edit } = this.state;

    return (
      <List.Item>
        <div style={{ float: "right" }}>
          <Popup
            inverted
            trigger={
              <Button
                circular
                color={edit ? "green" : "vk"}
                icon={edit ? "undo" : "edit"}
                onClick={() => this.setState({ edit: !edit })}
              />
            }
            content={edit ? "undo changes" : "edit roles"}
          />
          <Popup
            inverted
            trigger={<Button circular color="teal" icon="privacy" />}
            content="reset password"
          />
        </div>
        <Avatar round name={u.email} size={40} textSizeRatio={2.5} />
        <span style={{ marginLeft: 20 }}>{u.email}</span>
        {edit ? (
          <form
            style={{ margin: "15px 0" }}
            onSubmit={e => {
              e.preventDefault();
              this.setState({ edit: false });
            }}
          >
            <Select
              multi
              onChange={selectedRoles => this.setState({ selectedRoles })}
              value={this.state.selectedRoles}
              options={roles.map(r => ({ value: r.id, label: r.role }))}
              placeholder="select roles"
            />
            <Button fluid style={{ marginTop: 5 }} primary content="Save" />
          </form>
        ) : (
          <List
            horizontal
            size="small"
            style={{ marginLeft: 60, display: "block", marginBottom: 5 }}
          >
            {u.roles &&
              u.roles.map(r => <List.Item key={r.id}>{r.role}</List.Item>)}
          </List>
        )}
      </List.Item>
    );
  }
}

UserListItem.propTypes = {
  u: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired
};

export default UserListItem;
