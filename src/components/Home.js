import React from 'react';
import { useHistory } from 'react-router-dom';

import { JOIN, HOST } from 'constants/routes';

import GameButton from 'components/global/GameButton';
import HeroBanner from 'components/global/HeroBanner';

const styles = {
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
};

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <HeroBanner background="rgba(0,0,0,0)">
        <h1 style={{ color: 'black' }}>Welcome to Games Night!</h1>
      </HeroBanner>
      <div style={styles.buttonsContainer}>
        <GameButton onMouseDown={() => history.push(JOIN)}>
          <h1>Join</h1>
        </GameButton>
        <GameButton onMouseDown={() => history.push(HOST)}>
          <h1>Host</h1>
        </GameButton>
      </div>
    </div>
  );
};

export default Home;
