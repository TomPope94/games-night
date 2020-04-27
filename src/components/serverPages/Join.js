import React, { useState } from 'react';
import { connect } from 'react-redux';

import { sendJoinSession } from 'actions/server';

import GameButton from 'components/global/GameButton';

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

const Join = ({ server, sendJoinSession }) => {
  const [session, setSession] = useState('');

  return (
    <div>
      <h1>Join a Server.</h1>
      <h4>
        Enter the unique identifier to join your friends and enjoy the games!
      </h4>
      <form>
        <div style={styles.inputContainer}>
          <input
            style={styles.textInput}
            type="text"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          />
          <GameButton
            onMouseDown={() => sendJoinSession(server.wsConnection, session)}
            background="#d66e31"
          >
            <h2>Join.</h2>
          </GameButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps, { sendJoinSession })(Join);
