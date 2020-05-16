import React, { useState } from 'react';
import { connect } from 'react-redux';

import { sendLivesChange } from 'actions/fiveSeconds';

import GameButton from 'components/global/GameButton';
import { setAlert } from 'actions/alert';

const styles = {
  livesContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  selectorContainer: {
    display: 'flex',
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
      <h3>Number of Lives:</h3>
      <div style={styles.selectorContainer}>
        <div style={styles.buttonsContainer}>
          <GameButton
            color="#d66e31"
            styling={{ margin: 5, marginRight: 10, padding: '0px 10px' }}
            onMouseDown={() => handleLivesChange(true)}
          >
            <p>+</p>
          </GameButton>
          <GameButton
            color="#d66e31"
            styling={{ margin: 5, marginRight: 10, padding: '0px 10px' }}
            onMouseDown={() => handleLivesChange(false)}
          >
            <p>-</p>
          </GameButton>
        </div>
        <h4>{fiveSeconds.numLives}</h4>
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
