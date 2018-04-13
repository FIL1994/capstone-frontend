import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, List, Popup } from "semantic-ui-react";
import Avatar from "react-avatar";
import Select from "react-virtualized-select";
import axios from "helpers/axios";
import _ from "lodash";
import { URLS } from "constants/index";

class UserListItem extends Component {
  state = {
    edit: false,
    selectedRoles: !_.isArray(this.props.user.roles)
      ? []
      : this.props.user.roles.map(r => ({ value: r.id, label: r.role }))
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ edit: false });

    try {
      await axios.put(
        `${URLS.USER}/roles/${this.props.user.id}`,
        this.state.selectedRoles.map(s => ({ id: s.value }))
      );
    } catch (e) {
      this.props.toast.error("An error occurred");
      this.setState({ edit: false });
      return;
    }

    this.props.toast.success("Successfully updated roles");
    this.props.getUsers();
  };

  resetPassword = async () => {
    try {
      await axios.post(`${URLS.USER}/${this.props.user.id}/resetpassword`);
    } catch (e) {
      this.props.toast.error(
        "An error occurred resetting the password for: " + this.props.user.email
      );
      return;
    }
    this.props.toast.success(
      `Reset password for ${this.props.user.email} to: password`
    );
  };

  render() {
    const { user, roles } = this.props;
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
            trigger={
              <Button
                circular
                color="teal"
                icon="privacy"
                onClick={this.resetPassword}
              />
            }
            content="reset password"
          />
        </div>
        <Avatar round name={user.email} size={40} textSizeRatio={2.5} />
        <span style={{ marginLeft: 20 }}>{user.email}</span>
        {edit ? (
          <form style={{ margin: "15px 0" }} onSubmit={this.onSubmit}>
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
            {user.roles &&
              user.roles.map(r => <List.Item key={r.id}>{r.role}</List.Item>)}
          </List>
        )}
      </List.Item>
    );
  }
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  toast: PropTypes.func,
  getUsers: PropTypes.func.isRequired
};

export default UserListItem;
