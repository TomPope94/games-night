import React, { useState } from 'react';

const Game = ({ title, ...props }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    gameContainer: {
      width: 400,
    },
    innerGameContainer: {
      margin: 25,
      minHeight: 300,
      borderRadius: 10,
      boxShadow: '0 1px 3px rgba(1,1,1,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      transform: hover ? 'scale(1.05,1.05)' : 'scale(1,1)',
      transition: '0.2s linear',
    },
  };

  return (
    <div style={styles.gameContainer} {...props}>
      <div
        style={styles.innerGameContainer}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default Game;
