import React, { useState } from 'react';

const TeamPicker = ({ teamname, ...props }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    outerContainer: {
      padding: 10,
      width: '45%',
    },
    teamContainer: {
      borderTop: `15px solid ${
        teamname === 'Red'
          ? '#A45B5B'
          : teamname === 'Blue'
          ? '#4E7EA0'
          : teamname === 'Orange'
          ? '#BF8F68'
          : teamname === 'Green'
          ? '#8DA881'
          : 'black'
      }`,
      minHeight: 200,
      boxShadow: '0px 1px 3px rgba(1,1,1,0.5)',
      borderRadius: 10,
      cursor: 'pointer',
      transform: hover ? 'scale(1.015,1.015)' : 'scale(1,1)',
      transition: '0.1s linear',
      color:
        teamname === 'Red'
          ? '#A45B5B'
          : teamname === 'Blue'
          ? '#4E7EA0'
          : teamname === 'Orange'
          ? '#BF8F68'
          : teamname === 'Green'
          ? '#8DA881'
          : 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 10,
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        style={styles.teamContainer}
        {...props}
      >
        <h2>Team {teamname}</h2>
        {props.children}
      </div>
    </div>
  );
};

export default TeamPicker;
