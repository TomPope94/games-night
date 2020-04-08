import React from 'react';

const GridBox = ({ background, ...props }) => {
  const styles = {
    gridBox: {
      flexGrow: 1,
      boxShadow: '0 2px 5px rbga(1,1,1,0.3)',
      borderRadius: 10,
      background:
        background === 'reds'
          ? 'red'
          : background === 'blues'
          ? 'blue'
          : background === 'agent'
          ? 'black'
          : 'grey',
      height: 75,
      margin: 15,
    },
  };

  return <div style={styles.gridBox} />;
};

export default GridBox;
