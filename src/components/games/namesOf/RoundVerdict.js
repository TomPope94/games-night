import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { sendVerdict } from 'actions/namesOf';

const RoundVerdict = ({ server, session, namesOf, sendVerdict }) => {
  const [timeLeft, setTimeLeft] = useState(3);

  const styles = {
    gameContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    playerNameContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '25%',
    },
    votingContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '75%',
      marginTop: 50,
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
    <div style={styles.gameContainer}>
      <div style={styles.playerNameContainer}>
        <h2>Current Player:</h2>
        <h3>{namesOf.playerTurn.Username}</h3>
      </div>
      <div style={styles.playerNameContainer}>
        <h2>Time Left:</h2>
        <h3>{timeLeft}</h3>
      </div>
      <div style={styles.votingContainer}>
        <div
          style={{
            ...styles.voteBox,
            border: '5px solid #8DA881',
            color: '#8DA881',
          }}
          onMouseDown={() =>
            sendVerdict(server.wsConnection, session.sessionId, true)
          }
        >
          <h2 style={{ fontSize: '3rem' }}>PASS!</h2>
        </div>
        <div
          style={{
            ...styles.voteBox,
            border: '5px solid #A45B5B',
            color: '#A45B5B',
          }}
          onMouseDown={() =>
            sendVerdict(server.wsConnection, session.sessionId, false)
          }
        >
          <h2 style={{ fontSize: '3rem' }}>FAIL!</h2>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  namesOf: state.namesOf,
});

export default connect(mapStateToProps, { sendVerdict })(RoundVerdict);
