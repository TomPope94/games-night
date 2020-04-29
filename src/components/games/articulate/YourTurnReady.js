import React from 'react';
import GameButton from 'components/global/GameButton';

const styles = {
  readyContainer: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    padding: 50,
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const YourTurnReady = ({ changestate, ...props }) => {
  return (
    <div style={styles.readyContainer}>
      <h1>It's your turn!</h1>
      <GameButton color="#d66e31" onMouseDown={() => changestate('Round')}>
        <h2>Begin.</h2>
      </GameButton>
    </div>
  );
};

export default YourTurnReady;
