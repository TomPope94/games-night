import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { sendPlayerJoin, sendStateChange } from 'actions/fiveSeconds';
import { setAlert } from 'actions/alert';

import ModePicker from 'components/games/ModePicker';
import LivesPicker from 'components/games/fiveseconds/LivesPicker';
import PlayersList from 'components/games/PlayersList';
import GameButton from 'components/global/GameButton';
import SocialContainer from 'components/games/library/SocialContainer';

const GamesSetupMobile = ({
  server,
  session,
  fiveSeconds,
  sendPlayerJoin,
  sendStateChange,
}) => {
  const [focus, setFocus] = useState(false);
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
    },
    startContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      paddingBottom: 100,
    },
    buttonsRow: {
      display: focus ? 'none' : 'flex',
      width: '100%',
      position: 'fixed',
      bottom: 0,
      zIndex: 1000,
    },
    button: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      width: '50%',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  const [tabSelected, setTabSelected] = useState('game');
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { width, height } = dimensions;

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerHeight, window.innerWidth]);

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
      <div style={styles.buttonsRow}>
        <div
          style={{
            ...styles.button,
            background: tabSelected === 'game' ? '#273859' : '#fff',
            color: tabSelected === 'game' ? '#fff' : '#d9145c',
          }}
          onMouseDown={() => setTabSelected('game')}
        >
          <h3>Game</h3>
        </div>
        <div
          style={{
            ...styles.button,
            background: tabSelected === 'social' ? '#273859' : '#fff',
            color: tabSelected === 'social' ? '#fff' : '#d9145c',
          }}
          onMouseDown={() => setTabSelected('social')}
        >
          <h3>Social</h3>
        </div>
      </div>
      {tabSelected === 'game' ? (
        <div
          style={{
            height: height - 300,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <h3>
            <em>Name 3 things within 5 seconds... that's the rule!</em>
          </h3>
          <div style={styles.setupContainer}>
            <ModePicker
              styling={{ width: '75%' }}
              modename="Core Setup"
              hovereffect={false}
            >
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
              <GameButton color="#d9145c" onMouseDown={() => handleBegin()}>
                <h2>Begin!</h2>
              </GameButton>
            </div>
          ) : null}
        </div>
      ) : tabSelected === 'social' ? (
        <SocialContainer
          styling={{
            width: '100%',
            position: 'fixed',
            right: 0,
            top: 100,
            zIndex: 999,
          }}
          mobile={true}
          focus={focus}
          setfocus={setFocus}
        />
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  fiveSeconds: state.fiveSeconds,
});

export default connect(mapStateToProps, { sendPlayerJoin, sendStateChange })(
  GamesSetupMobile
);
