import React from 'react';
import { useHistory } from 'react-router-dom';

import { CODENAMES, ARTICULATE, FIVESECONDS } from 'constants/routes';
import logo from '../s10Icon.png';

import GameButton from 'components/global/GameButton';
import HeroBanner from 'components/global/HeroBanner';

const styles = {
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
};

const Home = () => {
  const history = useHistory();

  return (
    <div style={{ background: 'rgba(0,0,0,.03)', height: '100vh' }}>
      <div>
        <img
          src={logo}
          style={{
            position: 'absolute',
            height: 25,
            top: 0,
            left: 0,
            margin: 25,
          }}
        />
      </div>
      <HeroBanner background='rgba(0,0,0,0)'>
        <h1 style={{ color: 'black' }}>Welcome to Games Night!</h1>
      </HeroBanner>
      <h2>Please choose a game...</h2>
      <div style={styles.buttonsContainer}>
        <GameButton
          onMouseDown={() => history.push(CODENAMES)}
          background='radial-gradient(#FFD10A,#7C134B)'
        >
          <h1>Codenames</h1>
        </GameButton>
        <GameButton
          onMouseDown={() => history.push(ARTICULATE)}
          background='radial-gradient(#fff, #069732, #F3B637, #D43426)'
        >
          <h1>Articulate!</h1>
        </GameButton>
        <GameButton
          onMouseDown={() => history.push(FIVESECONDS)}
          background='blue'
        >
          <h1>5 Second Rule</h1>
        </GameButton>
      </div>
    </div>
  );
};

export default Home;
