import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import YourTurnReady from 'components/games/articulate/YourTurnReady';
import ArticulateSummary from 'components/games/articulate/ArticulateSummary';
import YourTurnRound from './YourTurnRound';

const ArticulateRound = ({ session, server, articulate }) => {
  const [cat, setCat] = useState('');
  const [teamState, setTeamState] = useState('');

  const getCategory = () => {
    const cats = ['object', 'action', 'world', 'people', 'nature'];
    const pos = articulate.gameTeams[articulate.teamTurn].Pos;

    return cats[pos % cats.length];
  };

  useEffect(() => {
    const category = getCategory();
    setCat(category);
    setTeamState(articulate.teamTurn);
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

  return !articulate.roundComplete && !articulate.roundStart ? (
    <Fragment>
      {articulate.yourTurn && !articulate.roundComplete ? (
        <YourTurnReady category={cat} />
      ) : (
        <div>
          <div style={styles.teamIndicator} />
          <h1>
            {articulate.playerTurn} is about to go! Get your game faces on!
          </h1>
          <h2>The category is: {cat}</h2>
        </div>
      )}
    </Fragment>
  ) : !articulate.roundComplete && articulate.roundStart ? (
    <Fragment>
      {articulate.yourTurn && !articulate.roundComplete ? (
        <YourTurnRound category={cat} />
      ) : (
        <div>
          <h1>Current Score: {articulate.roundScore}</h1>
          <h2>Correct Words: </h2>
          <ol>
            {articulate.wordsCorrect.map((word) => (
              <li>{word}</li>
            ))}
          </ol>
        </div>
      )}
    </Fragment>
  ) : (
    <ArticulateSummary />
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
  server: state.server,
  articulate: state.articulate,
});

export default connect(mapStateToProps)(ArticulateRound);
