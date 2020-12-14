import React from 'react';
import { connect } from 'react-redux';

import GameSetup from 'components/games/epicCrackers/GameSetup';
import Header from 'components/games/epicCrackers/Header';

const EpicCrackers = () => {
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
        {/* {namesOf.gameState === 'setup' ? ( */}
        <GameSetup />
        {/* ) : namesOf.gameState === 'BeginGame' ||
          namesOf.gameState === 'GameInProgress' ? (
          <GameRound />
        ) : null} */}
      </div>
    </div>
  );
};

export default EpicCrackers;
