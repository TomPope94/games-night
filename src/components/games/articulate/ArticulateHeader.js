import React from 'react';
import { connect } from 'react-redux';

import HeroBanner from 'components/global/HeroBanner';
import GameButton from 'components/global/GameButton';

import { sendRefreshData, sendEndGame } from 'actions/articulate';

const styles = {
  headerContainer: {
    position: 'relative',
  },
};

const ArticulateHeader = ({
  server,
  session,
  sendRefreshData,
  sendEndGame,
}) => {
  return (
    <div style={styles.headerContainer}>
      {session.isHost ? (
        <GameButton
          styling={{ position: 'absolute', left: 0, top: 10 }}
          color="#d66e31"
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
          color="#d66e31"
          onMouseDown={() =>
            sendRefreshData(server.wsConnection, session.sessionId)
          }
        >
          <p>Reset Cards</p>
        </GameButton>
      ) : null}
      <HeroBanner background="transparent">
        <h1 style={{ color: 'black' }}>Articulate!</h1>
      </HeroBanner>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps, { sendRefreshData, sendEndGame })(
  ArticulateHeader
);