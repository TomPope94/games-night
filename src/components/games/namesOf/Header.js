import React from 'react';
import { connect } from 'react-redux';

import { sendEndGame } from 'actions/namesOf';

import GameButton from 'components/global/GameButton';
import HeroBanner from 'components/global/HeroBanner';

const Header = ({ server, session, namesOf, sendEndGame }) => {
  const styles = {
    headerContainer: {
      position: 'relative',
      width: namesOf.gameState === 'setup' ? '75%' : '100%',
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
      <HeroBanner background="transparent">
        <h1 style={{ color: '#0396A6' }}>Names of... Types of</h1>
      </HeroBanner>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  namesOf: state.namesOf,
});

export default connect(mapStateToProps, { sendEndGame })(Header);
