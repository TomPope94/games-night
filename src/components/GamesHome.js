import React from 'react';
import { useHistory } from 'react-router-dom';

import { CODENAMES, ARTICULATE, FIVESECONDS } from 'constants/routes';

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
      <h2>Please choose a game...</h2>
      <div style={styles.buttonsContainer}>
        <GameButton
          onMouseDown={() => history.push(CODENAMES)}
          background="#7C134B"
        >
          <h1>Codenames</h1>
        </GameButton>
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
  );
};

export default Home;
