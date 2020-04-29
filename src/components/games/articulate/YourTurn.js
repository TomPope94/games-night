import React, { useState, useEffect, Fragment } from 'react';
import PassedWord from 'components/games/articulate/PassedWord';
import ArticulateData from 'constants/ArticulateData';
import GameButton from 'components/global/GameButton';
import YourTurnReady from './YourTurnReady';
import YourTurnRound from './YourTurnRound';
import YourTurnSummary from './YourTurnSummary';

const YourTurn = () => {
  const [gameState, setGameState] = useState('Ready');

  return (
    <Fragment>
      {gameState === 'Ready' ? (
        <YourTurnReady changestate={setGameState} />
      ) : gameState === 'Round' ? (
        <YourTurnRound changestate={setGameState} />
      ) : (
        <YourTurnSummary />
      )}
    </Fragment>
  );
};

export default YourTurn;
