import React from 'react';
import { useHistory } from 'react-router-dom';

import { JOIN, HOST } from 'constants/routes';

const styles = {
  buttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    marginLeft: 50,
    cursor: 'pointer',
  },
};

const GuestNavButtons = () => {
  const history = useHistory();

  return (
    <div style={styles.buttonsContainer}>
      <div onMouseDown={() => history.push(JOIN)} style={styles.button}>
        Join
      </div>
      <div onMouseDown={() => history.push(HOST)} style={styles.button}>
        Host
      </div>
    </div>
  );
};

export default GuestNavButtons;
