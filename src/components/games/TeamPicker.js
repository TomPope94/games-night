import React, { useState } from 'react';

const TeamPicker = ({ teamname, ...props }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    teamContainer: {
      background:
        teamname === 'Red'
          ? '#F20732'
          : teamname === 'Blue'
          ? '#0439D9'
          : teamname === 'Orange'
          ? '#d66e31'
          : teamname === 'Green'
          ? 'green'
          : 'black',
      minHeight: 200,
      flexGrow: 1,
      margin: 20,
      boxShadow: '0px 3px 5px rgba(1,1,1,0.5)',
      borderRadius: 10,
      cursor: 'pointer',
      transform: hover ? 'scale(1.015,1.015)' : 'scale(1,1)',
      transition: '0.1s linear',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 10,
    },
  };

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={styles.teamContainer}
      {...props}
    >
      <h2>Team {teamname}</h2>
      {props.children}
    </div>
  );
};

export default TeamPicker;
