import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  sendRefreshData,
  sendTeamSelect,
  sendStateChange,
  sendModeChange,
} from 'actions/articulate';

import { setAlert } from 'actions/alert';

import HeroBanner from 'components/global/HeroBanner';
import TeamPicker from 'components/games/TeamPicker';
import GameButton from 'components/global/GameButton';
import SocialContainer from 'components/games/library/SocialContainer';
import ModePicker from 'components/games/ModePicker';

const ArticulateTeamsMobile = ({
  server,
  session,
  articulate,
  sendTeamSelect,
  sendStateChange,
  sendModeChange,
  sendRefreshData,
  setAlert,
}) => {
  const [focus, setFocus] = useState(false);
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

  const styles = {
    articulateContainer: {
      height: dimensions.height - 150,
      overflow: 'auto',
      width: '100% ',
    },
    pickerContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: 25,
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

  const handleTeamSelect = async (team) => {
    if (!articulate.teamChosen) {
      await sendTeamSelect(server.wsConnection, team, session.sessionId);
    }
  };

  const checkTeamValid = () => {
    const arr = Object.values(articulate.gameTeams);
    const validArr = [];
    for (let i = 0; i < arr.length; i++) {
      const players = arr[i].Players;

      if (players.length === 1) {
        return false;
      }

      validArr.push(players.length);
    }

    const check = validArr.reduce((acc, val) => acc + val);
    if (check === 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleModeChange = async (mode) => {
    if (session.isHost && mode !== articulate.gameMode) {
      await sendModeChange(server.wsConnection, session.sessionId, mode);
    } else {
      setAlert('Only the host can change modes...', 'neutral');
    }
  };

  const handleBegin = async () => {
    //check that all teams with >0 people has >1
    const check = await checkTeamValid();
    // debugger;
    if (!session.isHost) {
      setAlert('Only the host can start games...', 'neutral');
    } else if (!check) {
      setAlert('Teams playing need at least 2 players', 'negative');
    } else if (Object.values(articulate.gameData).length < 1) {
      setAlert('Need to reset the cards before playing', 'neutral');
    } else {
      sendStateChange(server.wsConnection, session.sessionId, 'GameBegin');
    }
  };

  return (
    <Fragment>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Articulate!</h2>
      </div>
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
        <div style={styles.articulateContainer}>
          <h2>Choose your team:</h2>
          <div style={styles.pickerContainer}>
            <TeamPicker
              teamname="Red"
              onMouseDown={() => handleTeamSelect('Red')}
            >
              {articulate.gameTeams.Red.Players.map((player) => (
                <p>{player.Username}</p>
              ))}
            </TeamPicker>
            <TeamPicker
              teamname="Blue"
              onMouseDown={() => handleTeamSelect('Blue')}
            >
              {articulate.gameTeams.Blue.Players.map((player) => (
                <p>{player.Username}</p>
              ))}
            </TeamPicker>
            <TeamPicker
              teamname="Orange"
              onMouseDown={() => handleTeamSelect('Orange')}
            >
              {articulate.gameTeams.Orange.Players.map((player) => (
                <p>{player.Username}</p>
              ))}
            </TeamPicker>
            <TeamPicker
              teamname="Green"
              onMouseDown={() => handleTeamSelect('Green')}
            >
              {articulate.gameTeams.Green.Players.map((player) => (
                <p>{player.Username}</p>
              ))}
            </TeamPicker>
          </div>
          <h2>Choose which mode:</h2>
          <div style={styles.pickerContainer}>
            <ModePicker
              modename="Furthest Wins"
              styling={{ width: '50%' }}
              active={articulate.gameMode === 'FurthestWins' ? true : false}
              onMouseDown={() => handleModeChange('FurthestWins')}
            >
              <ul>
                <li>Each player get's one turn.</li>
                <li>The team with the most points at the end wins.</li>
              </ul>
            </ModePicker>
            <ModePicker
              modename="Buzz to Win"
              styling={{ width: '50%' }}
              active={articulate.gameMode === 'BuzzToWin' ? true : false}
              onMouseDown={() => handleModeChange('BuzzToWin')}
            >
              <ul>
                <li>
                  Once a team reaches the end, they enter the "Buzz Round".
                </li>
                <li>
                  One word comes up to which every player (including opposition)
                  can buzz in.
                </li>
                <li>
                  If the first person to buzz is correct AND from the same team
                  - that team wins.
                </li>
                <li>
                  If that person is from the opposing team, the game continues.
                </li>
              </ul>
            </ModePicker>
            <div style={styles.startContainer}>
              {session.isHost ? (
                <GameButton
                  onMouseDown={async () =>
                    await sendRefreshData(
                      server.wsConnection,
                      session.sessionId
                    )
                  }
                  color="#d9145c"
                >
                  <h2>Refresh</h2>
                </GameButton>
              ) : null}
              <GameButton onMouseDown={() => handleBegin()} color="#d9145c">
                <h2>Begin!</h2>
              </GameButton>
            </div>
          </div>
        </div>
      ) : tabSelected === 'social' ? (
        <SocialContainer
          styling={{
            width: '100%',
            position: 'fixed',
            left: 0,
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
  articulate: state.articulate,
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps, {
  sendTeamSelect,
  sendStateChange,
  sendModeChange,
  setAlert,
  sendRefreshData,
})(ArticulateTeamsMobile);
