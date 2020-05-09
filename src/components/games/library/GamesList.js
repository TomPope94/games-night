import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  CODENAMES,
  ARTICULATE,
  FIVESECONDS,
  GUESSPEOPLE,
} from 'constants/routes';

import Game from 'components/games/library/Game';

const GamesList = ({ server, ...props }) => {
  const history = useHistory();
  const styles = {
    libraryContainer: {
      display: 'flex',
      flexDirection: 'column',
      ...props.styling,
    },
    gamesContainer: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
    },
  };

  return (
    <div style={styles.libraryContainer}>
      <h2>Games:</h2>
      <div style={styles.gamesContainer}>
        <Game onMouseDown={() => history.push(ARTICULATE)} title="Articulate" />
        <Game
          onMouseDown={() => history.push(FIVESECONDS)}
          title="Think Fast"
        />
        <Game
          onMouseDown={() => history.push(GUESSPEOPLE)}
          title="Who's the Person?"
        />
        <Game title="Names of, Types of" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps)(GamesList);