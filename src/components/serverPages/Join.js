import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { sendJoinSession, sendChangeUsername } from 'actions/server';
import { LIBRARY } from 'constants/routes';

import GameButton from 'components/global/GameButton';

const styles = {
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '50%',
    fontSize: '1.5rem',
    borderRadius: 5,
    padding: 10,
    boxShadow: '0 0 10px rgba(1,1,1,0.1) inset',
  },
};

const Join = ({ server, sendJoinSession, sendChangeUsername }) => {
  const history = useHistory();
  const [session, setSession] = useState('');
  const [codeState, setCodeState] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(server.username);
  }, [server.username]);

  return (
    <div>
      <h1>Join a Server.</h1>
      <h4>Pick a name... Enter the server code... enjoy the games!</h4>
      <form style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={styles.inputContainer}>
          <div style={{ marginTop: 25, display: 'flex', alignItems: 'center' }}>
            <h4 style={{ width: '50%', textAlign: 'right', paddingRight: 20 }}>
              Username:
            </h4>
            <input
              type="text"
              value={username}
              style={styles.textInput}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={async () =>
                await sendChangeUsername(server.wsConnection, username)
              }
            />
          </div>
          {!codeState ? (
            <GameButton color="#273859" onMouseDown={() => setCodeState(true)}>
              <h2>Set name.</h2>
            </GameButton>
          ) : null}
          {codeState ? (
            <Fragment>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4
                  style={{ width: '50%', textAlign: 'right', paddingRight: 20 }}
                >
                  Code:
                </h4>
                <input
                  style={styles.textInput}
                  type="text"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <GameButton
                  onMouseDown={async () => {
                    await sendJoinSession(server.wsConnection, session);
                    history.push(LIBRARY);
                  }}
                  background="#273859"
                >
                  <h2>Join.</h2>
                </GameButton>
              </div>
            </Fragment>
          ) : null}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps, {
  sendJoinSession,
  sendChangeUsername,
})(Join);
