import React from 'react';
import GridBox from 'components/games/codenames/GridBox';

const styles = {
  rowContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '75%',
    alignItems: 'center',
  },
};

const GridRow = ({ boxes }) => {
  //   debugger;
  return (
    <div style={styles.rowContainer}>
      {boxes.map((box) => (
        <GridBox background={box} />
      ))}
    </div>
  );
};

export default GridRow;
