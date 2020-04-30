import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { CODENAMES, ARTICULATE, FIVESECONDS } from 'constants/routes';

import GameButton from 'components/global/GameButton';
import Loader from 'components/global/Loader';

const styles = {
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
};

const Library = ({ server }) => {
  const history = useHistory();
  return (
    <div>
      {server.loading ? (
        <Loader />
      ) : (
        <div>
          <h2>Please choose a game...</h2>
          <div style={styles.buttonsContainer}>
            <GameButton
              onMouseDown={() => history.push(ARTICULATE)}
              background="#D43426"
            >
              <h1>Articulate!</h1>
            </GameButton>
            <GameButton
              onMouseDown={() => history.push(FIVESECONDS)}
              background="blue"
            >
              <h1>5 Second Rule</h1>
            </GameButton>
            <GameButton>
              <h1>Guess the People</h1>
            </GameButton>
            <GameButton>
              <h1>Names of...Types of...</h1>
            </GameButton>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps)(Library);
