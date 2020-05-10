import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { sendEndQuestion } from 'actions/fiveSeconds';

const GameQuestion = ({ server, session, fiveSeconds, sendEndQuestion }) => {
  const [start, setStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6);

  const styles = {
    pageContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      background: timeLeft <= 4 ? 'red' : '#fff',
      transition: '4s linear',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    questionContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#fff',
      padding: 50,
      borderRadius: 5,
      boxShadow: '0 3px 5px rgba(1,1,1,0.5)',
    },
  };

  useEffect(() => {
    setStart(false);
  }, []);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft && session.isHost)
      sendEndQuestion(server.wsConnection, session.sessionId);
    if (timeLeft === 4) {
      setStart(true);
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <div style={styles.pageContainer}>
      {timeLeft ? (
        <div style={styles.questionContainer}>
          <h1>{fiveSeconds.playerTurn.Username}!</h1>
          <h4>{fiveSeconds.gameQuestion}</h4>
          <p style={{ fontSize: '4rem' }}>{timeLeft}</p>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  fiveSeconds: state.fiveSeconds,
});

export default connect(mapStateToProps, { sendEndQuestion })(GameQuestion);
