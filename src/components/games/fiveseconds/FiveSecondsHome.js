import React, { useState, useEffect } from 'react';

import FiveSecondsGame from 'components/games/fiveseconds/FiveSecondsGame';

import HeroBanner from 'components/global/HeroBanner';
import GameButton from 'components/global/GameButton';

import FiveSecondsData from 'constants/FiveSecondData';

const styles = {
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const FiveSecondsHome = () => {
  const data = FiveSecondsData.cards;

  const [gameActive, setGameActive] = useState(false);
  const [gameWord, setGameWord] = useState(null);

  const getNewWord = () => {
    const randomNum = Math.floor(Math.random() * data.length);
    setGameWord(data[randomNum]);
    data.splice(randomNum, 1); // Stops you from getting the same word twice
    return data[randomNum];
  };

  const refresh = () => {
    if (!gameActive) {
      setGameActive(true);
    }
    getNewWord();
  };

  useEffect(() => {
    getNewWord();
  }, [getNewWord]);

  return (
    <div>
      <HeroBanner background="blue">
        <h1>Five Second Rule</h1>
      </HeroBanner>
      <div style={styles.gameContainer}>
        <h3>
          <em>Name 3 things within 5 seconds... that's the rule!</em>
        </h3>
        <GameButton onMouseDown={() => refresh()} color="black">
          <p>Refresh</p>
        </GameButton>
        {gameActive ? (
          <FiveSecondsGame setgameactive={setGameActive} word={gameWord} />
        ) : null}
      </div>
    </div>
  );
};

export default FiveSecondsHome;