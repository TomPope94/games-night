import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { sendPlayerJoin, sendStateChange } from 'actions/fiveSeconds';
import { setAlert } from 'actions/alert';

import ModePicker from 'components/games/ModePicker';
import PlayersList from 'components/games/PlayersList';
import GameButton from 'components/global/GameButton';
import LivesPicker from 'components/games/fiveseconds/LivesPicker';

const styles = {
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setupContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  startContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 100,
  },
};

const GameSetup = ({
  fiveSeconds,
  server,
  session,
  sendPlayerJoin,
  sendStateChange,
  setAlert,
}) => {
  const handleBegin = async () => {
    if (Object.values(fiveSeconds.gameData).length < 1) {
      setAlert('Need to reset the cards before playing', 'neutral');
    } else if (fiveSeconds.players.length < 1) {
      setAlert('Need at least one player to play...', 'neutral');
    } else {
      await sendStateChange(
        server.wsConnection,
        session.sessionId,
        'BeginGame'
      );
    }
  };

  return (
    <Fragment>
      <h3>
        <em>Name 3 things within 5 seconds... that's the rule!</em>
      </h3>
      <div style={styles.setupContainer}>
        <ModePicker styling={{ width: '75%' }} hovereffect={false}>
          <LivesPicker />
        </ModePicker>
        <PlayersList
          styling={{ width: '25%' }}
          onMouseDown={async () => {
            if (!fiveSeconds.inPool) {
              await sendPlayerJoin(server.wsConnection, session.sessionId);
            }
          }}
        >
          {fiveSeconds.players.map((player) => (
            <h4>{player.Username}</h4>
          ))}
        </PlayersList>
      </div>
      {session.isHost ? (
        <div style={styles.startContainer}>
          <GameButton color="#d66e31" onMouseDown={() => handleBegin()}>
            <h2>Begin!</h2>
          </GameButton>
        </div>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  fiveSeconds: state.fiveSeconds,
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps, {
  sendPlayerJoin,
  sendStateChange,
  setAlert,
})(GameSetup);
