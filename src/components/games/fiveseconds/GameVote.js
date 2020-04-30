import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { sendVote, sendResult } from 'actions/fiveSeconds';
import GameButton from 'components/global/GameButton';

const styles = {
  voterContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  voteBox: {
    width: '35%',
    minHeight: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    cursor: 'pointer',
  },
};

const GameVote = ({ server, session, fiveSeconds, sendVote, sendResult }) => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  useEffect(() => {
    async function wait() {
      await delay(3000);
      console.log('result: ', fiveSeconds.pass >= fiveSeconds.fail);
      sendResult(
        server.wsConnection,
        session.sessionId,
        fiveSeconds.pass >= fiveSeconds.fail
      );
    }

    if (fiveSeconds.pass + fiveSeconds.fail >= fiveSeconds.players.length) {
      wait();
    }
  }, [fiveSeconds.pass, fiveSeconds.fail]);

  return (
    <div style={styles.voterContainer}>
      {fiveSeconds.pass + fiveSeconds.fail < fiveSeconds.players.length ? (
        <Fragment>
          {fiveSeconds.yourTurn || fiveSeconds.voted ? (
            <h1>The votes are being counted...</h1>
          ) : (
            <Fragment>
              <div
                style={{ ...styles.voteBox, background: 'red' }}
                onMouseDown={() =>
                  sendVote(server.wsConnection, session.sessionId, false)
                }
              >
                <h2>FAIL!</h2>
              </div>
              <div
                style={{ ...styles.voteBox, background: 'green' }}
                onMouseDown={() =>
                  sendVote(server.wsConnection, session.sessionId, true)
                }
              >
                <h2>PASS!</h2>
              </div>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {fiveSeconds.pass >= fiveSeconds.fail ? (
            <h1 style={{ fontSize: '3rem' }}>PASSED!</h1>
          ) : (
            <h1 style={{ fontSize: '3rem' }}>DENIED!</h1>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  fiveSeconds: state.fiveSeconds,
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps, { sendVote, sendResult })(GameVote);
