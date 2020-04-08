import React, { useState, Fragment } from 'react';
import ArticulateRound from 'components/articulate/ArticulateRound';

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
          <button
            onMouseDown={() => setGameStart(false)}
            style={{ zIndex: 999, position: 'absolute' }}
          >
            Stop
          </button>
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
          <button onMouseDown={() => setGameStart(true)}>Begin!</button>
        </Fragment>
      )}
    </div>
  );
};

export default ArticulateGame;
