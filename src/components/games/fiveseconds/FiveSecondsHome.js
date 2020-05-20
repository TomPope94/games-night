import React from 'react';
import { connect } from 'react-redux';

import GameRound from 'components/games/fiveseconds/GameRound';

import Header from 'components/games/fiveseconds/Header';

import GameSetup from './GameSetup';

const styles = {
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

const FiveSecondsHome = ({ fiveSeconds }) => {
  return (
    <div>
      <Header />
      <div style={styles.gameContainer}>
        {fiveSeconds.gameState === 'setup' ? (
          <GameSetup />
        ) : fiveSeconds.gameState === 'BeginGame' ||
          fiveSeconds.gameState === 'GameInProgress' ? (
          <GameRound />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fiveSeconds: state.fiveSeconds,
});

export default connect(mapStateToProps)(FiveSecondsHome);
