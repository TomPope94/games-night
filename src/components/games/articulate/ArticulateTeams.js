import React from 'react';
import { connect } from 'react-redux';

import {
  sendTeamSelect,
  sendStateChange,
  sendModeChange,
} from 'actions/articulate';

import HeroBanner from 'components/global/HeroBanner';
import TeamPicker from 'components/games/TeamPicker';
import GameButton from 'components/global/GameButton';
import ModePicker from '../ModePicker';

const ArticulateTeams = ({
  server,
  session,
  articulate,
  sendTeamSelect,
  sendStateChange,
  sendModeChange,
}) => {
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
    if (!articulate.teamChosen) {
      await sendTeamSelect(server.wsConnection, team, session.sessionId);
    }
  };

  const checkTeamValid = () => {
    const arr = Object.values(articulate.gameTeams);
    for (let i = 0; i < arr.length; i++) {
      const players = arr[i].Players;

      if (players.length === 1) {
        return false;
      }
    }

    return true;
  };

  const handleModeChange = async (mode) => {
    if (session.isHost && mode !== articulate.gameMode) {
      await sendModeChange(server.wsConnection, session.sessionId, mode);
    }
  };

  const handleBegin = async () => {
    //check that all teams with >0 people has >1
    const check = await checkTeamValid();
    debugger;
    if (check) {
      sendStateChange(server.wsConnection, session.sessionId, 'GameInProgress');
    }
  };

  return (
    <div>
      <h2>Choose your team:</h2>
      <div style={styles.pickerContainer}>
        <TeamPicker teamname="Red" onMouseDown={() => handleTeamSelect('Red')}>
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
            <li>Once a team reaches the end, they enter the "Buzz Round".</li>
            <li>
              One word comes up to which every player (including opposition) can
              buzz in.
            </li>
            <li>
              If the first person to buzz is correct AND from the same team -
              that team wins.
            </li>
            <li>
              If that person is from the opposing team, the game continues.
            </li>
          </ul>
        </ModePicker>
      </div>
      <div style={styles.startContainer}>
        <GameButton onMouseDown={() => handleBegin()} color="#d66e31">
          <h2>Begin!</h2>
        </GameButton>
      </div>
    </div>
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
})(ArticulateTeams);
