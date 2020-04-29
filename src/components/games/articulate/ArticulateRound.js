import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import YourTurn from './YourTurn';

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

  return (
    <div>
      <div style={styles.teamIndicator} />
      <h1>{articulate.playerTurn}! It's your turn!</h1>
      {articulate.yourTurn ? <YourTurn /> : <h2>The category: {cat}</h2>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
  server: state.server,
  articulate: state.articulate,
});

export default connect(mapStateToProps)(ArticulateRound);
