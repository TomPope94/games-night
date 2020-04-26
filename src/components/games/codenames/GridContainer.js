import React from 'react';

import GridRow from 'components/games/codenames/GridRow';

const styles = {
  gridContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const GridContainer = ({ firstplayer, ...props }) => {
  let cardData = {
    reds: firstplayer === 'red' ? 8 : 7,
    blues: firstplayer === 'blue' ? 8 : 7,
    agent: 1,
    neutrals: 4,
  };

  const elements = ['reds', 'blues', 'agent', 'neutrals'];

  const renderedRows = [];
  for (let i = 0; i < 4; i++) {
    // choose a combination of 5 elements
    const boxes = [];
    for (let j = 0; j < 5; j++) {
      const randomNum = Math.floor(Math.random() * elements.length);
      const chosenBox = elements[randomNum];
      boxes.push(chosenBox);
      // if becomes 0 then remove from elements array
      if (cardData[chosenBox] - 1 <= 0) {
        elements.splice(randomNum, 1);
      }
      // reduce the element value by 1
      cardData = {
        ...cardData,
        [`${chosenBox}`]: cardData[chosenBox] - 1,
      };
    }

    renderedRows.push(<GridRow boxes={boxes} />);
  }

  return (
    <div style={styles.gridContainer}>{firstplayer ? renderedRows : null}</div>
  );
};

export default GridContainer;
