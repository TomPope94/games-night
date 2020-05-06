import React, { useState } from 'react';

const GameButton = ({ children, ...props }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    buttonContainer: {
      paddingLeft: 25,
      paddingRight: 25,
      borderRadius: 10,
      margin: 25,
      background: props.background,
      boxShadow: '0 2px 5px rgba(1,1,1,0.3)',
      cursor: 'pointer',
      color: props.color ? props.color : 'white',
      transform: hover ? 'scale(1.1, 1.1)' : 'scale(1, 1)',
      transition: '0.2s linear',
      ...props.styling,
    },
  };

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={styles.buttonContainer}
      {...props}
    >
      {children}
    </div>
  );
};

export default GameButton;
