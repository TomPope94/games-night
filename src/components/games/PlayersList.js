import React from 'react';

const PlayersList = ({ ...props }) => {
  const styles = {
    modeContainer: {
      background: '#fff',
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
      {props.children}
    </div>
  );
};

export default PlayersList;
