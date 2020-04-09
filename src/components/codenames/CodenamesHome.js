import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import NewGameForm from 'components/codenames/NewGameForm';
import GridContainer from 'components/codenames/GridContainer';

import HeroBanner from 'components/global/HeroBanner';

import { HOME } from 'constants/routes';
import GameButton from 'components/global/GameButton';

const styles = {
  refreshContainer: {
    display: 'flex',
  },
};

const CodenamesHome = () => {
  const history = useHistory();

  const [refreshGame, setRefresh] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState(null);

  return (
    <div>
      <p style={{ cursor: 'pointer' }} onMouseDown={() => history.push(HOME)}>
        Home
      </p>
      <HeroBanner background='#fff'>
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
