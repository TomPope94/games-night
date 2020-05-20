import React from 'react';
import { connect } from 'react-redux';

import Header from 'components/games/namesOf/Header';
import GameSetup from 'components/games/namesOf/GameSetup';
import GameRound from 'components/games/namesOf/GameRound';

const NamesOfHome = ({ namesOf }) => {
  const styles = {
    gameContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };

  return (
    <div>
      <Header />
      <div style={styles.gameContainer}>
        {namesOf.gameState === 'setup' ? (
          <GameSetup />
        ) : namesOf.gameState === 'BeginGame' ||
          namesOf.gameState === 'GameInProgress' ? (
          <GameRound />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  namesOf: state.namesOf,
});

export default connect(mapStateToProps)(NamesOfHome);
