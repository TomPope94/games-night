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
      boxShadow: '0 3px 5px rgba(1,1,1,0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
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
