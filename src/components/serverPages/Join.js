import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import GameButton from 'components/global/GameButton';

import { LIBRARY } from 'constants/routes';

const styles = {
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    marginTop: 50,
    fontSize: '2rem',
    borderRadius: 5,
    padding: 10,
    boxShadow: '0 0 10px rgba(1,1,1,0.1) inset',
  },
};

const Join = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Join a Server.</h1>
      <h4>
        Enter the unique identifier to join your friends and enjoy the games!
      </h4>
      <form>
        <div style={styles.inputContainer}>
          <input style={styles.textInput} type="text" />
          <GameButton
            onMouseDown={() => history.push(LIBRARY)}
            background="#d66e31"
          >
            <h2>Join.</h2>
          </GameButton>
        </div>
      </form>
    </div>
  );
};

export default Join;
