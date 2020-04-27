import React, { useState } from 'react';
import { connect } from 'react-redux';

const PlayersDropdown = ({ session }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    playersBox: {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      transform: hover ? 'scaleY(1)' : 'scaleY(0)',
      transition: '0.2s linear',
      transformOrigin: 'center top',
      background: '#fff',
      width: '100%',
      boxShadow: '0 3px 5px rgba(1,1,1,0.3)',
    },
    playerName: {
      fontSize: '1.25rem',
      paddingLeft: 20,
    },
  };

  return (
    <div onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <h1>Players</h1>
      <div style={styles.playersBox}>
        {session.players.map((player) => (
          <p style={styles.playerName}>{player.Username}</p>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(PlayersDropdown);
