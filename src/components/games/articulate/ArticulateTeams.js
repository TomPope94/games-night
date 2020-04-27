import React from 'react';
import { connect } from 'react-redux';

import { sendTeamSelect, sendStateChange } from 'actions/articulate';

import HeroBanner from 'components/global/HeroBanner';
import TeamPicker from 'components/games/TeamPicker';
import GameButton from 'components/global/GameButton';

const ArticulateTeams = ({
  server,
  session,
  articulate,
  sendTeamSelect,
  sendStateChange,
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
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
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
      <HeroBanner background="transparent">
        <h1 style={{ color: 'black' }}>Articulate!</h1>
      </HeroBanner>
      <h1>Choose your team:</h1>
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
      <div style={styles.startContainer}>
        <GameButton onMouseDown={() => handleBegin()} color="#d66e31">
          <h1>Begin!</h1>
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

export default connect(mapStateToProps, { sendTeamSelect, sendStateChange })(
  ArticulateTeams
);
