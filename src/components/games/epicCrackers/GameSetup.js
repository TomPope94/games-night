import React, { useState } from 'react';
import { connect } from 'react-redux';

import ModePicker from 'components/games/ModePicker';
import PlayersList from 'components/games/PlayersList';
import GameButton from 'components/global/GameButton';
import SocialContainer from 'components/games/library/SocialContainer';

import { sendPlayerChange, sendStateChange } from 'actions/epicCrackers';
import { setAlert } from 'actions/alert';

const GameSetup = ({
  server,
  session,
  epicCrackers,
  sendPlayerChange,
  sendStateChange,
  setAlert,
}) => {
  const styles = {
    gameContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    setupContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      height: '65%',
    },
    startContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      marginTop: 40,
    },
  };

  const [focus, setFocus] = useState(false);

  const handleBegin = async () => {
    if (epicCrackers.players.length < 2) {
      setAlert('Need at least two players to play...', 'neutral');
    } else {
      await sendStateChange(
        server.wsConnection,
        session.sessionId,
        'BeginGame'
      );
    }
  };

  return (
    <div>
      <div
        style={{
          minHeight: 600,
          width: '75%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <div style={styles.setupContainer}>
          <ModePicker
            styling={{ width: '75%', height: '100%' }}
            modename="Core Setup"
            hovereffect={false}
          />
          <PlayersList
            styling={{ width: '25%', overflow: 'auto', height: '100%' }}
            onMouseDown={async () => {
              if (!epicCrackers.inPool) {
                await sendPlayerChange(server.wsConnection, session.sessionId);
              }
            }}
          >
            {epicCrackers.players.map((player) => (
              <h4>{player.Username}</h4>
            ))}
          </PlayersList>
        </div>
        {session.isHost ? (
          <div style={styles.startContainer}>
            <GameButton color="#d9145c" onMouseDown={handleBegin}>
              <h2>Begin!</h2>
            </GameButton>
          </div>
        ) : null}
      </div>
      <SocialContainer
        styling={{
          width: '25%',
          position: 'fixed',
          right: 0,
          top: 100,
          zIndex: 999,
        }}
        mobile={false}
        focus={focus}
        setfocus={setFocus}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  epicCrackers: state.epicCrackers,
});

export default connect(mapStateToProps, {
  sendStateChange,
  sendPlayerChange,
  setAlert,
})(GameSetup);
