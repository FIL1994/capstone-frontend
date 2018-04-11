import React, { Fragment } from "react";
import { withConsumer } from "./Context";
import _ from "lodash";

const withAuth = (Component, roles) =>
  withConsumer(props => {
    const { userDetails, hasUserDetails } = props.context.state;
    const authorities = userDetails.authorities || [];

    const userDetailsIsEmpty = _.isEmpty(userDetails);

    let hasRole = true;
    if (!_.isEmpty(roles)) {
      hasRole = authorities.map(a => a.authority).includes(...roles);
    }

    console.log("props", props);

    if (hasUserDetails && (userDetailsIsEmpty || !hasRole)) {
      props.history.push("/401");
      
      props.context.actions.setRequestedPage(
        _.toString(props.location.pathname || "").slice(0, 4) === "/401"
          ? "/home"
          : props.location.pathname
      );
    }

    return (
      <Fragment>
        {!userDetailsIsEmpty &&
          hasRole && <Component {..._.omit(props, "context")} />}
      </Fragment>
    );
  });

export default withAuth;
