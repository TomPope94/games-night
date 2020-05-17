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
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 1px 3px rgba(1,1,1,0.5)',
              padding: 50,
              borderTop: `25px solid ${
                teamState === 'Red'
                  ? '#A45B5B'
                  : teamState === 'Blue'
                  ? '#4E7EA0'
                  : teamState === 'Orange'
                  ? '#BF8F68'
                  : teamState === 'Green'
                  ? '#8DA881'
                  : 'black'
              }`,
              borderRadius: 10,
            }}
          >
            <h1>
              {guessPeople.playerTurn.Username} is about to go! Get your game
              faces on!
            </h1>
            <h2>The round is: Articulate</h2>
            <div style={{ width: '100%' }}>
              <h3>Team:</h3>
              {teamState !== ''
                ? guessPeople.gameTeams[teamState].Players.map((player) => (
                    <p style={{ marginLeft: 100 }}>{player.Username}</p>
                  ))
                : null}
            </div>
          </div>
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
              <li>{word.name}</li>
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
