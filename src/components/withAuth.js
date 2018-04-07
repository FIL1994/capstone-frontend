import React, { Fragment } from "react";
import { withConsumer } from "./Context";
import _ from "lodash";
import { ROLES } from "constants/roles";

const withAuth = (Component, roles) =>
  withConsumer(props => {
    const { userDetails, hasUserDetails } = props.context.state;
    const authorities = userDetails.authorities || [];

    const userDetailsIsEmpty = _.isEmpty(userDetails);

    let hasRole = true;
    if (!_.isEmpty(roles)) {
      hasRole = authorities.map(a => a.authority).includes(...roles);
    }

    if (hasUserDetails && (userDetailsIsEmpty || !hasRole)) {
      props.history.push("/401");
    }

    return (
      <Fragment>
        {!userDetailsIsEmpty &&
          hasRole && <Component {..._.omit(props, "context")} />}
      </Fragment>
    );
  });

export default withAuth;
