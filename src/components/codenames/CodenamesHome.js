import React, { useState } from 'react';

import NewGameForm from 'components/codenames/NewGameForm';
import GridContainer from 'components/codenames/GridContainer';

import HeroBanner from 'components/global/HeroBanner';

import GameButton from 'components/global/GameButton';

const styles = {
  refreshContainer: {
    display: 'flex',
  },
};

const CodenamesHome = () => {
  const [refreshGame, setRefresh] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState(null);

  return (
    <div>
      <HeroBanner background="#fff">
        <h1 style={{ color: 'black' }}>Codenames Generator</h1>
      </HeroBanner>
      {!refreshGame ? (
        <div style={styles.refreshContainer}>
          <GameButton onMouseDown={() => setRefresh(true)}>
            <p style={{ color: 'black' }}>
              <em>Refresh</em>
            </p>
          </GameButton>
        </div>
      ) : (
        <NewGameForm setfirst={setFirstPlayer} changerefresh={setRefresh} />
      )}
      <GridContainer firstplayer={firstPlayer} />
    </div>
  );
};

export default CodenamesHome;
