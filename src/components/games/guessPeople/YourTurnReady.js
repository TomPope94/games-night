import React from 'react';
import { connect } from 'react-redux';
import GameButton from 'components/global/GameButton';

import { sendStartRound } from 'actions/guessPeople';

const styles = {
  readyContainer: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    padding: 50,
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const YourTurnReady = ({
  server,
  session,
  guessPeople,
  sendStartRound,
  ...props
}) => {
  const handleBegin = async () => {
    await sendStartRound(server.wsConnection, session.sessionId);
  };

  return (
    <div style={styles.readyContainer}>
      <h1>It's your turn!</h1>
      {guessPeople.gameMode === 'Articulate' ? (
        <p>
          You will have 1 minute to explain as many people as possible. You can
          say anything you like, as long as you don't say that name!
        </p>
      ) : guessPeople.gameMode === 'Charades' ? (
        <p>
          You will have 1 minute to act out as many people as possible. You can
          do anything you like on camera, as long as you don't make a noise!
        </p>
      ) : guessPeople.gameMode === 'One Word' ? (
        <p>
          You will have 1 minute. There is one rule... you can only say one word
          per name! Note: if you've passed a word and go back to it, the word
          must stay the same.
        </p>
      ) : null}
      <p>Good luck {server.username}!</p>
      <GameButton color="#d66e31" onMouseDown={() => handleBegin()}>
        <h2>Begin.</h2>
      </GameButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  guessPeople: state.guessPeople,
});

export default connect(mapStateToProps, { sendStartRound })(YourTurnReady);
