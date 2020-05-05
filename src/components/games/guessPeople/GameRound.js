import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import YourTurnReady from 'components/games/guessPeople/YourTurnReady';
import YourTurnRound from 'components/games/guessPeople/YourTurnRound';
import RoundSummary from 'components/games/guessPeople/RoundSummary';

const GameRound = ({ session, server, guessPeople }) => {
  const [teamState, setTeamState] = useState('');

  useEffect(() => {
    setTeamState(guessPeople.teamTurn);
  }, []);

  const styles = {
    teamIndicator: {
      height: 50,
      width: '75%',
      background:
        teamState === 'Red'
          ? '#F20732'
          : teamState === 'Blue'
          ? '#0439D9'
          : teamState === 'Orange'
          ? '#d66e31'
          : teamState === 'Green'
          ? 'green'
          : 'black',
    },
  };

  return !guessPeople.roundComplete && !guessPeople.roundStart ? (
    <Fragment>
      {guessPeople.yourTurn && !guessPeople.roundComplete ? (
        <YourTurnReady />
      ) : (
        <div>
          <div style={styles.teamIndicator} />
          <h1>
            {guessPeople.playerTurn} is about to go! Get your game faces on!
          </h1>
        </div>
      )}
    </Fragment>
  ) : !guessPeople.roundComplete && guessPeople.roundStart ? (
    <Fragment>
      {guessPeople.yourTurn && !guessPeople.roundComplete ? (
        <YourTurnRound />
      ) : (
        <div>
          <h1>Current Score: {guessPeople.roundScore}</h1>
          <h2>Correct Words: </h2>
          <ol>
            {guessPeople.wordsCorrect.map((word) => (
              <li>{word}</li>
            ))}
          </ol>
        </div>
      )}
    </Fragment>
  ) : (
    <RoundSummary />
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
  server: state.server,
  guessPeople: state.guessPeople,
});

export default connect(mapStateToProps)(GameRound);
