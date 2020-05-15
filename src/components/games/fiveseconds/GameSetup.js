import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { sendPlayerJoin, sendStateChange } from 'actions/fiveSeconds';
import { setAlert } from 'actions/alert';

import ModePicker from 'components/games/ModePicker';
import PlayersList from 'components/games/PlayersList';
import GameButton from 'components/global/GameButton';
import LivesPicker from 'components/games/fiveseconds/LivesPicker';
import SocialContainer from 'components/games/library/SocialContainer';
import GameSetupMobile from 'components/games/fiveseconds/GameSetupMobile';

const styles = {
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  setupContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '75%',
  },
  startContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '75%',
    paddingBottom: 100,
  },
};

const GameSetup = ({
  fiveSeconds,
  server,
  session,
  sendPlayerJoin,
  setAlert,
}) => {
  const [focus, setFocus] = useState(false);
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
      {width < 1000 ? (
        <GameSetupMobile />
      ) : (
        <Fragment>
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
                    await sendPlayerJoin(
                      server.wsConnection,
                      session.sessionId
                    );
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
        </Fragment>
      )}
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
