import React from 'react';

const GridBox = ({ background, ...props }) => {
  const styles = {
    gridBox: {
      flexGrow: 1,
      boxShadow: '0 2px 5px rgba(1,1,1,0.3)',
      borderRadius: 10,
      background:
        background === 'reds'
          ? '#F20732'
          : background === 'blues'
          ? '#0439D9'
          : background === 'agent'
          ? 'black'
          : '#D9D9D9',
      height: 150,
      margin: 15,
    },
  };

  return <div style={styles.gridBox} />;
};

export default GridBox;
