import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import FiveSecondsGame from 'components/games/fiveseconds/FiveSecondsGame';

import HeroBanner from 'components/global/HeroBanner';
import GameButton from 'components/global/GameButton';
import Header from 'components/games/fiveseconds/Header';

import FiveSecondsData from 'constants/FiveSecondData';
import ModePicker from '../ModePicker';
import PlayersList from '../PlayersList';
import GameSetup from './GameSetup';

const styles = {
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setupContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
};

const FiveSecondsHome = ({ fiveSeconds, server, session }) => {
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
      <Header />
      <div style={styles.gameContainer}>
        {fiveSeconds.gameState === 'setup' ? (
          <GameSetup />
        ) : (
          <FiveSecondsGame setgameactive={setGameActive} word={gameWord} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fiveSeconds: state.fiveSeconds,
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps)(FiveSecondsHome);
