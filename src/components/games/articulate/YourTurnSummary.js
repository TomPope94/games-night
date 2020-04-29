import React from 'react';
import { connect } from 'react-redux';

const YourTurnSummary = ({ articulate, server, session }) => {
  return (
    <div>
      <h1>Your team scored: {articulate.roundScore}</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  articulate: state.articulate,
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps)(YourTurnSummary);
