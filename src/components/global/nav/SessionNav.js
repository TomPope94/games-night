import React from 'react';
import { connect } from 'react-redux';

const SessionNav = ({ session }) => {
  return (
    <div style={{ display: 'flex' }}>
      <h1 style={{ marginRight: 20 }}>Code: {session.sessionId}</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(SessionNav);
