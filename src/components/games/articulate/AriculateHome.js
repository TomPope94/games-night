import React, { useState } from 'react';
import { connect } from 'react-redux';

import ArticulateHeader from 'components/games/articulate/ArticulateHeader';
import ArticulateTeams from 'components/games/articulate/ArticulateTeams';
import ArticulateBoard from 'components/games/articulate/ArticulateBoard';
import ArticulateRound from 'components/games/articulate/ArticulateRound';

const ArticulateHome = ({ articulate }) => {
  // const categories = ['people', 'world', 'object', 'actions', 'nature'];
  const { gameState } = articulate;

  return (
    <div>
      <ArticulateHeader />
      {gameState === 'TeamSelect' ? (
        <ArticulateTeams />
      ) : gameState === 'GameInProgress' ? (
        <ArticulateBoard />
      ) : gameState === 'RoundInProgress' ? (
        <ArticulateRound />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  articulate: state.articulate,
});

export default connect(mapStateToProps)(ArticulateHome);
