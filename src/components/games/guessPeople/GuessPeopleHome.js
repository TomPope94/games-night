import React from 'react';
import { connect } from 'react-redux';

// import GameRound from 'components/games/guessPeople/GameRound';
import Header from 'components/games/guessPeople/Header';
import GameSetup from 'components/games/guessPeople/GameSetup';
import PeopleSetup from 'components/games/guessPeople/PeopleSetup';
import GameBoard from 'components/games/guessPeople/GameBoard';
import GameRound from 'components/games/guessPeople/GameRound';

const styles = {
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setupContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
};

const GuessPeopleHome = ({ guessPeople }) => {
  return (
    <div>
      <Header />
      <div style={styles.gameContainer}>
        {guessPeople.gameState === 'setup' ? (
          <GameSetup />
        ) : !guessPeople.completedSubmits ? (
          <PeopleSetup />
        ) : guessPeople.gameState === 'RoundInProgress' ? (
          <GameRound />
        ) : (
          <GameBoard />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  guessPeople: state.guessPeople,
});

export default connect(mapStateToProps)(GuessPeopleHome);
