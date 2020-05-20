import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { sendPlayerJoin, sendStateChange } from 'actions/namesOf';
import { setAlert } from 'actions/alert';

import ModePicker from 'components/games/ModePicker';
import PlayersList from 'components/games/PlayersList';
import GameButton from 'components/global/GameButton';
import SocialContainer from 'components/games/library/SocialContainer';
import GameSetupMobile from 'components/games/namesOf/GameSetupMobile';

const GameSetup = ({
  server,
  session,
  namesOf,
  sendPlayerJoin,
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
    if (namesOf.players.length < 1) {
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
    <div>
      {width < 1000 ? (
        <GameSetupMobile />
      ) : (
        <Fragment>
          <div
            style={{
              height: height - 300,
              width: '75%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
            }}
          >
            <h3>
              <em>Shout a name or type of the category chosen</em>
            </h3>
            <div style={styles.setupContainer}>
              <ModePicker
                styling={{ width: '75%', height: '100%' }}
                modename="Core Setup"
                hovereffect={false}
              ></ModePicker>
              <PlayersList
                styling={{ width: '25%', overflow: 'auto', height: '100%' }}
                onMouseDown={async () => {
                  if (!namesOf.inPool) {
                    await sendPlayerJoin(
                      server.wsConnection,
                      session.sessionId
                    );
                  }
                }}
              >
                {namesOf.players.map((player) => (
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  namesOf: state.namesOf,
});

export default connect(mapStateToProps, {
  sendPlayerJoin,
  sendStateChange,
  setAlert,
})(GameSetup);
