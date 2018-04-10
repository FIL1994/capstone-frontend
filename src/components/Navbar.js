import React from "react";
import { Link, withRouter, matchPath } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import _ from "lodash";

import RMS from "assets/RMS_No_Slogan.png";
import { withConsumer } from "components/Context";
import { ROLES } from "constants/roles";

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
  const authorities =
    props.context.state &&
    props.context.state.userDetails &&
    props.context.state.userDetails.authorities;

  const roles = !_.isArray(authorities)
    ? []
    : authorities.map(a => a.authority);

  return (
    <Menu>
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
      </Menu.Menu>
    </Menu>
  );
};

export default withRouter(withConsumer(Navbar));
