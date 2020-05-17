import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { sendChangeUsername } from 'actions/server';
import GameButton from 'components/global/GameButton';

import { hostSession } from 'actions/server';
import { LIBRARY } from 'constants/routes';

const Host = ({ server, hostSession, sendChangeUsername }) => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [codeState, setCodeState] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { width, height } = dimensions;

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerHeight, window.innerWidth]);

  useEffect(() => {
    setUsername(server.username);
  }, [server.username]);

  const styles = {
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
      fontSize: '1.5rem',
      borderRadius: 5,
      padding: 10,
      boxShadow: '0 0 10px rgba(1,1,1,0.1) inset',
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
      }}
    >
      <h1>Host a Server.</h1>
      <h4>Start a server to enjoy the games with your friends!</h4>
      <form>
        <div
          style={{
            marginTop: 25,
            display: 'flex',
            flexDirection: width < 1000 ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h4 style={{ textAlign: 'right', paddingRight: 20 }}>Username:</h4>
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
        <div style={styles.inputContainer}>
          {!codeState ? (
            <GameButton color="#273859" onMouseDown={() => setCodeState(true)}>
              <h2>Set name.</h2>
            </GameButton>
          ) : (
            <GameButton
              onMouseDown={async () => {
                await hostSession(server.wsConnection);
                history.push(LIBRARY);
              }}
              background="#273859"
            >
              <h2>Create Server.</h2>
            </GameButton>
          )}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps, { hostSession, sendChangeUsername })(
  Host
);
