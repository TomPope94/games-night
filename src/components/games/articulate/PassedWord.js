import React from 'react';

const styles = {
  wordContainer: {
    padding: 10,
    margin: 15,
    background: '#fff',
    borderRadius: 10,
    cursor: 'pointer',
    color: 'black',
    pointerEvents: 'all',
  },
};

const PassedWord = ({ correct, word, children, ...props }) => {
  return (
    <div onMouseDown={() => correct(word)} style={styles.wordContainer}>
      {children}
    </div>
  );
};

export default PassedWord;
