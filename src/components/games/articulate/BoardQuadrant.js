import React from 'react';

const BoardQuadrant = ({ name, mobile, details, ...props }) => {
  const styles = {
    quadContainer: {
      width: mobile ? '100%' : '40%',
      margin: 20,
      position: 'relative',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    teamIndicator: {
      width: '100%',
      borderRadius: 10,
      paddingBottom: 35,
      borderTop: `15px solid ${
        name === 'Red'
          ? '#A45B5B'
          : name === 'Blue'
          ? '#4E7EA0'
          : name === 'Orange'
          ? '#BF8F68'
          : name === 'Green'
          ? '#8DA881'
          : 'black'
      }`,
      boxShadow: '0 1px 3px rgba(1,1,1,0.5)',
    },
    poolRow: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-evenly',
    },
  };

  return (
    <div style={styles.quadContainer} {...props}>
      <div style={styles.teamIndicator}>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
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
    </div>
  );
};

export default BoardQuadrant;
