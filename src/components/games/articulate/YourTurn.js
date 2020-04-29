import React, { useState, useEffect, Fragment } from 'react';
import PassedWord from 'components/games/articulate/PassedWord';
import ArticulateData from 'constants/ArticulateData';
import GameButton from 'components/global/GameButton';
import YourTurnReady from './YourTurnReady';
import YourTurnRound from './YourTurnRound';
import YourTurnSummary from './YourTurnSummary';

const YourTurn = ({ category }) => {
  const [gameState, setGameState] = useState('Ready');

  return (
    <Fragment>
      {gameState === 'Ready' ? (
        <YourTurnReady category={category} changestate={setGameState} />
      ) : gameState === 'Round' ? (
        <YourTurnRound changestate={setGameState} />
      ) : null}
    </Fragment>
  );
};

export default YourTurn;
