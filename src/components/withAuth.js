import React, { Fragment } from "react";
import { withConsumer } from "./Context";
import _ from "lodash";

const withAuth = Component =>
  withConsumer(props => {
    const { userDetails, hasUserDetails } = props.context.state;

    const userDetailsIsEmpty = _.isEmpty(userDetails);

    if (hasUserDetails && userDetailsIsEmpty) {
      props.history.push("/401");
    }

    return (
      <Fragment>
        {!userDetailsIsEmpty && <Component {..._.omit(props, "context")} />}
      </Fragment>
    );
  });

export default withAuth;
