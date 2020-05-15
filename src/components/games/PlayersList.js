import React from 'react';

const PlayersList = ({ ...props }) => {
  const styles = {
    modeContainer: {
      background: '#a0b0d0',
      minHeight: 200,
      flexGrow: 1,
      margin: 20,
      boxShadow: '0px 3px 5px rgba(1,1,1,0.5)',
      borderRadius: 10,
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      padding: 10,
      paddingLeft: 50,
      ...props.styling,
    },
  };

  return (
    <div style={styles.modeContainer} {...props}>
      <h2>Players:</h2>
      <h4>(Click here to join!)</h4>
      {props.children}
    </div>
  );
};

export default PlayersList;
