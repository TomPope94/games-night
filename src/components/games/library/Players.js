import React from 'react';
import { connect } from 'react-redux';

const Players = ({ session }) => {
  const styles = {
    playersContainer: {
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 20,
    },
  };

  return (
    <div style={styles.playersContainer}>
      <h2>The Players:</h2>
      {session.players.map((player) => (
        <p>{player.Username}</p>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(Players);
