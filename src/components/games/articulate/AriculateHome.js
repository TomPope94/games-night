import React, { useState } from 'react';

import ArticulateGame from 'components/games/articulate/ArticulateGame';

import GameButton from 'components/global/GameButton';
import HeroBanner from 'components/global/HeroBanner';

const styles = {
  articulateContainer: {
    margin: 20,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    displayWrap: 'wrap',
    marginTop: 25,
  },
};

const ArticulateHome = () => {
  const categories = ['people', 'world', 'object', 'actions', 'nature'];

  const [gameState, setGameState] = useState({
    active: false,
    category: null,
  });

  const handleClick = (category) => {
    if (category === 'random') {
      const randomNum = Math.floor(Math.random() * categories.length);
      const randomCat = categories[randomNum];

      setGameState({
        active: true,
        category: randomCat,
      });
    } else {
      setGameState({
        active: true,
        category: category,
      });
    }
  };

  return (
    <div>
      <HeroBanner background="#fff">
        <h1 style={{ color: 'black' }}>Articulate!</h1>
      </HeroBanner>
      <div style={styles.articulateContainer}>
        <h3>
          <em>Pick a category...</em>
        </h3>
        <div style={styles.buttonsContainer}>
          <GameButton
            onMouseDown={() => handleClick('people')}
            background="yellow"
            color="black"
          >
            People
          </GameButton>
          <GameButton
            onMouseDown={() => handleClick('world')}
            background="teal"
            color="black"
          >
            World
          </GameButton>
          <GameButton
            onMouseDown={() => handleClick('object')}
            background="silver"
            color="black"
          >
            Object
          </GameButton>
          <GameButton
            onMouseDown={() => handleClick('actions')}
            background="orange"
            color="black"
          >
            Action
          </GameButton>
          <GameButton
            onMouseDown={() => handleClick('nature')}
            background="green"
            color="black"
          >
            Nature
          </GameButton>
          <GameButton
            onMouseDown={() => handleClick('random')}
            background="#8a0b0b"
            color="black"
          >
            Random
          </GameButton>
        </div>
        {gameState.active ? (
          <ArticulateGame
            category={gameState.category}
            gamestate={gameState}
            setgamestate={setGameState}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ArticulateHome;
