import React, { useState } from 'react';

const GridContainer = ({ firstplayer, ...props }) => {
  const cardData = {
    reds: firstplayer === 'red' ? 8 : 7,
    blues: firstplayer === 'blue' ? 8 : 7,
    agent: 1,
    neutrals: 4,
  };

  return (
    <div>
      <h1>Grid will go here!</h1>
    </div>
  );
};

export default GridContainer;
