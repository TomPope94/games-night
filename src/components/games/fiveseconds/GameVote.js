import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { sendVote, sendResult } from 'actions/fiveSeconds';
import GameButton from 'components/global/GameButton';

const GameVote = ({
  server,
  session,
  fiveSeconds,
  sendVote,
  sendResult,
  mobile,
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeStart, setTimeStart] = useState(false);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft && timeStart && session.isHost) {
      sendResult(
        server.wsConnection,
        session.sessionId,
        fiveSeconds.pass >= fiveSeconds.fail
      );
    }

    const intervalId = timeStart
      ? setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000)
      : null;

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  useEffect(() => {
    if (
      fiveSeconds.pass + fiveSeconds.fail >= fiveSeconds.players.length &&
      fiveSeconds.roundRoundComplete &&
      session.isHost &&
      !timeStart
    ) {
      setTimeLeft(3);
      setTimeStart(true);
    }
  }, [fiveSeconds.pass, fiveSeconds.fail]);

  const styles = {
    voterContainer: {
      display: 'flex',
      flexDirection: mobile ? 'column-reverse' : 'row',
      width: mobile ? '100vw' : '100%',
      height: mobile ? '100vh' : '100%',
      background: mobile ? '#fff' : 'transparent',
      position: mobile ? 'absolute' : 'relative',
      top: 0,
      left: 0,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    voteBox: {
      width: '45%',
      minHeight: 150,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgb(1,1,1,0.5)',
      borderRadius: 10,
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.voterContainer}>
      {fiveSeconds.pass + fiveSeconds.fail < fiveSeconds.players.length ? (
        <Fragment>
          {fiveSeconds.yourTurn || fiveSeconds.voted ? (
            <h1>The votes are being counted...</h1>
          ) : (
            <Fragment>
              <div
                style={{
                  ...styles.voteBox,
                  border: '5px solid #A45B5B',
                  color: '#A45B5B',
                }}
                onMouseDown={() =>
                  sendVote(server.wsConnection, session.sessionId, false)
                }
              >
                <h2 style={{ fontSize: '3rem' }}>FAIL!</h2>
              </div>
              <div
                style={{
                  ...styles.voteBox,
                  border: '5px solid #8DA881',
                  color: '#8DA881',
                }}
                onMouseDown={() =>
                  sendVote(server.wsConnection, session.sessionId, true)
                }
              >
                <h2 style={{ fontSize: '3rem' }}>PASS!</h2>
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
          <h2>{timeLeft}</h2>
          {fiveSeconds.pass >= fiveSeconds.fail ? (
            <h1 style={{ fontSize: '3rem' }}>PASSED!</h1>
          ) : (
            <h1 style={{ fontSize: '3rem' }}>DENIED!</h1>
          )}
        </div>
      )}
      {session.isHost ? (
        <GameButton
          color="#d9145c"
          styling={{ position: 'absolute', bottom: 100, left: '50%' }}
          onMouseDown={() =>
            sendResult(
              server.wsConnection,
              session.sessionId,
              fiveSeconds.pass >= fiveSeconds.fail
            )
          }
        >
          <h2>Force Vote!</h2>
        </GameButton>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  fiveSeconds: state.fiveSeconds,
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps, { sendVote, sendResult })(GameVote);
