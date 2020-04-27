import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { HOME } from 'constants/routes';

const GameRoute = ({
  component: Component,
  server: { inGame, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return !inGame && !loading ? (
        <Redirect to={HOME} />
      ) : (
        <Component {...props} />
      );
    }}
  />
);

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps)(GameRoute);
