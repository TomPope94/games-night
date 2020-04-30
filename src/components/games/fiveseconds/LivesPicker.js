import React, { useState } from 'react';
import { connect } from 'react-redux';

import { sendLivesChange } from 'actions/fiveSeconds';

import GameButton from 'components/global/GameButton';
import { setAlert } from 'actions/alert';

const styles = {
  livesContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
  },
  selectorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const LivesPicker = ({
  server,
  session,
  fiveSeconds,
  sendLivesChange,
  setAlert,
}) => {
  const handleLivesChange = async (positive) => {
    if (session.isHost) {
      await sendLivesChange(
        server.wsConnection,
        session.sessionId,
        positive ? fiveSeconds.numLives + 1 : fiveSeconds.numLives - 1
      );
    } else {
      setAlert('Only the host can change the game settings...', 'neutral');
    }
  };

  return (
    <div style={styles.livesContainer}>
      <h1>Number of Lives:</h1>
      <div style={styles.selectorContainer}>
        <h4>{fiveSeconds.numLives}</h4>
        <div style={styles.buttonsContainer}>
          <GameButton
            color="#d66e31"
            onMouseDown={() => handleLivesChange(true)}
          >
            <p>+</p>
          </GameButton>
          <GameButton
            color="#d66e31"
            onMouseDown={() => handleLivesChange(false)}
          >
            <p>-</p>
          </GameButton>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  fiveSeconds: state.fiveSeconds,
});

export default connect(mapStateToProps, { sendLivesChange, setAlert })(
  LivesPicker
);
