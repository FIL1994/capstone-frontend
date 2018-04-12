import React from "react";
import { Link, withRouter, matchPath } from "react-router-dom";
import { Menu, Popup } from "semantic-ui-react";
import _ from "lodash";
import Avatar from "react-avatar";

import RMS from "assets/RMS_No_Slogan.png";
import { withConsumer } from "components/Context";
import { ROLES, URLS } from "constants/index";
import axios from "helpers/axios";

const LINKS = [
  { name: "Home", path: "/home", isExact: true },
  { name: "Customers", path: "/customer/", isExact: false },
  { name: "Employees", path: "/employee/", isExact: false },
  { name: "Projects", path: "/project/", isExact: false },
  { name: "Jobs", path: "/job/", isExact: false },
  { name: "Jobs Hours", path: "/jobhours/", isExact: false }
];

const ADMIN_LINK = { name: "Admin", path: "/admin/", isExact: false };

const Navbar = props => {
  const userDetails = props.context.state
    ? props.context.state.userDetails
    : {};

  const { authorities, username } = userDetails;

  const roles = !_.isArray(authorities)
    ? []
    : authorities.map(a => a.authority);

  return (
    <Menu tabular>
      <Menu.Item
        children={
          <Link to="/home">
            <img
              src={RMS}
              alt="RMS"
              style={{
                height: 30,
                padding: "5px 0 2px 5px",
                transform: "scale(1.6, 1.6)"
              }}
            />
          </Link>
        }
      />
      <Menu.Menu position="right">
        {LINKS.concat(roles.includes(ROLES.ADMIN) ? ADMIN_LINK : []).map(
          ({ name, path, isExact }, index) => {
            const isMatch = matchPath(props.location.pathname, {
              path,
              strict: false,
              isExact
            });
            const active =
              !_.isEmpty(isMatch) &&
              (isExact ? isExact === isMatch.isExact : true);
            return (
              <Menu.Item
                as={Link}
                to={path}
                className="myNavLink"
                name={name}
                active={active}
                key={index}
              >
                {name}
              </Menu.Item>
            );
          }
        )}
        {username && (
          <Popup
            style={{ right: 21, top: 58 }}
            hideOnScroll
            trigger={
              <Menu.Item>
                <div
                  style={{ cursor: "pointer", flex: "1", alignSelf: "stretch" }}
                >
                  <Avatar round name={username} size={40} textSizeRatio={2.5} />
                </div>
              </Menu.Item>
            }
            content={
              <Menu fluid vertical style={{ textAlign: "center" }}>
                <Menu.Item
                  name="Change Password"
                  as={Link}
                  to="/changepassword"
                />
                <Menu.Item
                  name="sign out"
                  onClick={() => {
                    axios.post(URLS.LOGOUT);
                    localStorage.removeItem("auth");
                    window.location = "/";
                  }}
                >
                  Sign Out
                </Menu.Item>
              </Menu>
            }
            on="click"
          />
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default withRouter(withConsumer(Navbar));
