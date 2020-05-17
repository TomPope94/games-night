import React from 'react';
import { connect } from 'react-redux';

import { sendStateChange } from 'actions/guessPeople';

import GameButton from 'components/global/GameButton';

const RoundSummary = ({ server, session, guessPeople, sendStateChange }) => {
  return (
    <div>
      <h1>Your team scored: {guessPeople.roundScore}!</h1>
      {guessPeople.wordsCorrect.length > 0 ? (
        <div>
          <h2>Words Answered:</h2>
          <ul>
            {guessPeople.wordsCorrect.map((word) => (
              <li>{word.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>You didn't get ONE?! WoW..... good job.......</h2>
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
  server: state.server,
  session: state.session,
  guessPeople: state.guessPeople,
});

export default connect(mapStateToProps, { sendStateChange })(RoundSummary);
