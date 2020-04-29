import React, { useState, Fragment } from 'react';
import ArticulateRound from 'components/games/articulate/ArticulateRound22';

import GameButton from 'components/global/GameButton';

const styles = {
  gameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    background: '#fff',
    padding: 50,
  },
};

const ArticulateGame = ({ gamestate, setgamestate, category, ...props }) => {
  const [gameStart, setGameStart] = useState(false);

  return (
    <div style={styles.gameContainer}>
      {gameStart ? (
        <Fragment>
          <ArticulateRound category={category} />
          <div style={{ display: 'flex' }}>
            <GameButton
              background="#fff"
              onMouseDown={() => setGameStart(false)}
            >
              <p style={{ color: 'black' }}>Stop</p>
            </GameButton>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p
            style={{ cursor: 'pointer' }}
            onMouseDown={() => setgamestate({ active: false, category: null })}
          >
            <em>Back</em>
          </p>
          <h1>Your Category: {category}</h1>
          <h3>
            When ready, press begin and start articulating... You will have ONE
            minute.
          </h3>
          <div style={{ display: 'flex' }}>
            <GameButton onMouseDown={() => setGameStart(true)}>
              <p style={{ color: 'black' }}>Begin!</p>
            </GameButton>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ArticulateGame;
