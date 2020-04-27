import React from 'react';
import { connect } from 'react-redux';

const PlayersDropdown = ({ session }) => {
  return (
    <div>
      <h1>Players</h1>
      {session.players.map((player) => (
        <p>{player.Username}</p>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(PlayersDropdown);
