import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const RoundPlayer = ({ server, session, namesOf }) => {
  const [timeLeft, setTimeLeft] = useState(3);

  const styles = {
    pageContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      background: timeLeft <= 2 ? 'red' : '#fff',
      transition: '2s cubic-bezier(.72,0,1,.49)',
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
    setTimeLeft(3);
  }, [namesOf.playerTurn]);

  useEffect(() => {
    // exit early when we reach 0
    // if (!timeLeft && session.isHost) {
    //   sendEndQuestion(server.wsConnection, session.sessionId);
    // }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft <= 0) {
      clearInterval(intervalId);
    }
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <div style={styles.pageContainer}>
      {timeLeft ? (
        <div style={styles.questionContainer}>
          <h1>{namesOf.playerTurn.Username}!</h1>
          <p style={{ fontSize: '4rem' }}>{timeLeft}</p>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  namesOf: state.namesOf,
});

export default connect(mapStateToProps)(RoundPlayer);
