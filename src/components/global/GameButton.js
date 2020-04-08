import React from 'react';

const GameButton = ({ children, ...props }) => {
  const styles = {
    buttonContainer: {
      padding: 25,
      borderRadius: 10,
      background: props.background,
      boxShadow: '0 2px 5px rgba(1,1,1,0.3)',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.buttonContainer} {...props}>
      {children}
    </div>
  );
};

export default GameButton;
