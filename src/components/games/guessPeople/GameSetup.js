import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { sendTeamSelect, sendStateChange } from 'actions/guessPeople';

import { setAlert } from 'actions/alert';

import TeamPicker from 'components/games/TeamPicker';
import GameButton from 'components/global/GameButton';
import SocialContainer from 'components/games/library/SocialContainer';
import GameSetupMobile from 'components/games/guessPeople/GameSetupMobile';

const GameSetup = ({
  server,
  session,
  guessPeople,
  setAlert,
  sendTeamSelect,
  sendStateChange,
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
  const styles = {
    articulateContainer: {
      margin: 20,
    },
    pickerContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      displayWrap: 'wrap',
      marginTop: 25,
    },
    startContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      paddingBottom: 100,
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
      {width < 1000 ? (
        <GameSetupMobile />
      ) : (
        <Fragment>
          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ width: '75%' }}>
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
  guessPeople: state.guessPeople,
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps, {
  setAlert,
  sendTeamSelect,
  sendStateChange,
})(GameSetup);
