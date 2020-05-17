import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { sendTeamSelect, sendStateChange } from 'actions/guessPeople';

import { setAlert } from 'actions/alert';

import TeamPicker from 'components/games/TeamPicker';
import GameButton from 'components/global/GameButton';
import SocialContainer from 'components/games/library/SocialContainer';

const GameSetupMobile = ({
  server,
  session,
  guessPeople,
  setAlert,
  sendTeamSelect,
  sendStateChange,
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
      margin: 20,
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
    if (!guessPeople.teamChosen) {
      await sendTeamSelect(server.wsConnection, team, session.sessionId);
    }
  };

  const checkTeamValid = () => {
    const arr = Object.values(guessPeople.gameTeams);
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

  const handleBegin = async () => {
    //check that all teams with >0 people has >1
    const check = await checkTeamValid();
    // debugger;
    if (!session.isHost) {
      setAlert('Only the host can start games...', 'neutral');
    } else if (!check) {
      setAlert('Teams playing need at least 2 players', 'negative');
    } else {
      sendStateChange(server.wsConnection, session.sessionId, 'GameBegin');
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
        <Fragment>
          <div style={{ width: '100%', marginBottom: 100 }}>
            <h2>Choose your team:</h2>
            <div style={styles.pickerContainer}>
              <TeamPicker
                teamname="Red"
                onMouseDown={() => handleTeamSelect('Red')}
              >
                {guessPeople.gameTeams.Red.Players.map((player) => (
                  <p>{player.Username}</p>
                ))}
              </TeamPicker>
              <TeamPicker
                teamname="Blue"
                onMouseDown={() => handleTeamSelect('Blue')}
              >
                {guessPeople.gameTeams.Blue.Players.map((player) => (
                  <p>{player.Username}</p>
                ))}
              </TeamPicker>
              <TeamPicker
                teamname="Orange"
                onMouseDown={() => handleTeamSelect('Orange')}
              >
                {guessPeople.gameTeams.Orange.Players.map((player) => (
                  <p>{player.Username}</p>
                ))}
              </TeamPicker>
              <TeamPicker
                teamname="Green"
                onMouseDown={() => handleTeamSelect('Green')}
              >
                {guessPeople.gameTeams.Green.Players.map((player) => (
                  <p>{player.Username}</p>
                ))}
              </TeamPicker>
            </div>
            <div style={styles.startContainer}>
              <GameButton onMouseDown={() => handleBegin()} color="#d66e31">
                <h2>Begin!</h2>
              </GameButton>
            </div>
          </div>
        </Fragment>
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
  guessPeople: state.guessPeople,
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps, {
  setAlert,
  sendTeamSelect,
  sendStateChange,
})(GameSetupMobile);
