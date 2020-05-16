import React from 'react';
import { connect } from 'react-redux';

import { sendDataReset, sendEndGame } from 'actions/fiveSeconds';

import HeroBanner from 'components/global/HeroBanner';
import GameButton from 'components/global/GameButton';

const Header = ({
  server,
  session,
  fiveSeconds,
  sendDataReset,
  sendEndGame,
}) => {
  const styles = {
    headerContainer: {
      position: 'relative',
      width: fiveSeconds.gameState === 'setup' ? '75%' : '100%',
    },
  };
  return (
    <div style={styles.headerContainer}>
      {session.isHost ? (
        <GameButton
          styling={{ position: 'absolute', left: 0, top: 10 }}
          color="#d9145c"
          onMouseDown={() =>
            sendEndGame(server.wsConnection, session.sessionId)
          }
        >
          <p>End Game</p>
        </GameButton>
      ) : null}
      {session.isHost ? (
        <GameButton
          styling={{ position: 'absolute', right: 0, top: 10 }}
          color="#d9145c"
          onMouseDown={() =>
            sendDataReset(server.wsConnection, session.sessionId)
          }
        >
          <p>Reset Cards</p>
        </GameButton>
      ) : null}
      <HeroBanner background="transparent">
        <h1 style={{ color: 'black' }}>Five Second Rule</h1>
      </HeroBanner>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  fiveSeconds: state.fiveSeconds,
});

export default connect(mapStateToProps, { sendDataReset, sendEndGame })(Header);
