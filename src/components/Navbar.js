import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import _ from "lodash";

import RMS from "assets/RMS_No_Slogan.png";
import { withConsumer } from "components/Context";
import { ROLES } from "constants/roles";

const Navbar = props => {
  const authorities =
    props.context.state &&
    props.context.state.userDetails &&
    props.context.state.userDetails.authorities;

  const roles = !_.isArray(authorities)
    ? []
    : authorities.map(a => a.authority);

  console.log("navbar", roles);

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
        <Menu.Item as={Link} to="/home" name="Home" />
        <Menu.Item as={Link} to="/customer" name="Customers" />
        <Menu.Item as={Link} to="/employee" name="Employees" />
        <Menu.Item as={Link} to="/project" name="Projects" />
        <Menu.Item as={Link} to="/job" name="Jobs" />
        <Menu.Item as={Link} to="/jobhours" name="JobHours" />
        {roles.includes(ROLES.ADMIN) && (
          <Menu.Item as={Link} to="/admin" name="Admin" />
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default withConsumer(Navbar);
