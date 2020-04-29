import React from 'react';
import { connect } from 'react-redux';

import { sendStateChange } from 'actions/articulate';

import GameButton from 'components/global/GameButton';

const ArticulateSummary = ({
  articulate,
  session,
  server,
  sendStateChange,
}) => {
  return (
    <div>
      <h1>Your team scored: {articulate.roundScore}!</h1>
      {articulate.wordsPassed.length > 0 ? (
        <div>
          <h2>Words Passed:</h2>
          <ul>
            {articulate.wordsPassed.map((word) => (
              <li>{word}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>No words passed!</h2>
      )}
      {session.isHost ? (
        <GameButton
          color="#d66e31"
          styling={{ position: 'absolute', top: '50%', right: 0, zIndex: 999 }}
          onMouseDown={() =>
            sendStateChange(
              server.wsConnection,
              session.sessionId,
              'GameInProgress'
            )
          }
        >
          <h3>Board</h3>
        </GameButton>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  articulate: state.articulate,
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps, { sendStateChange })(ArticulateSummary);
