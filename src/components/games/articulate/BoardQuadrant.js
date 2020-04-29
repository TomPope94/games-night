import React from 'react';

const BoardQuadrant = ({ name, details, ...props }) => {
  const styles = {
    quadContainer: {
      width: '50%',
      position: 'relative',
      height: '50%',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    teamIndicator: {
      height: 50,
      width: '75%',
      background:
        name === 'Red'
          ? '#F20732'
          : name === 'Blue'
          ? '#0439D9'
          : name === 'Orange'
          ? '#d66e31'
          : name === 'Green'
          ? 'green'
          : 'black',
    },
    poolRow: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-evenly',
    },
  };

  return (
    <div style={styles.quadContainer} {...props}>
      <div style={styles.teamIndicator} />
      <div>
        <h1>{details.Pos}</h1>
      </div>
      <div style={styles.poolRow}>
        <div>
          <h4>Player Pool</h4>
          {details.PlayersLeft.map((player) => (
            <p>{player.Username}</p>
          ))}
        </div>
        <div>
          <h4>Already Been</h4>
          {details.PlayersGone.map((player) => (
            <p>{player.Username}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardQuadrant;
