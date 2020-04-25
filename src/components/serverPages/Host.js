import React from 'react';
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

const Host = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Host a Server.</h1>
      <h4>Start a server to enjoy the games with your friends!</h4>
      <form>
        <div style={styles.inputContainer}>
          <GameButton
            onMouseDown={() => history.push(LIBRARY)}
            background="#d66e31"
          >
            <h2>Create Server.</h2>
          </GameButton>
        </div>
      </form>
    </div>
  );
};

export default Host;
