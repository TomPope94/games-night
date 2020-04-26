import React from 'react';
import { connect } from 'react-redux';

// import { connectSocket } from 'actions/server';

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

const ServerConnectButtons = () => {
  return (
    <div style={styles.buttonsContainer}>
      <div style={styles.button}>Connect to Games Night</div>
    </div>
  );
};

export default connect(null)(ServerConnectButtons);
