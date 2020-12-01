import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import ArticulateHeader from 'components/games/articulate/ArticulateHeader';
import ArticulateTeams from 'components/games/articulate/ArticulateTeams';
import ArticulateBoard from 'components/games/articulate/ArticulateBoard';
import ArticulateRound from 'components/games/articulate/ArticulateRound';
import GameComplete from 'components/games/articulate/GameComplete';

import ArticulateTeamsMobile from 'components/games/articulate/ArticulateTeamsMobile';

const ArticulateHome = ({ articulate }) => {
  // const categories = ['people', 'world', 'object', 'actions', 'nature'];
  const { gameState } = articulate;
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });
  const { width } = dimensions;
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  return (
    <div>
      {gameState === 'TeamSelect' ? (
        width < 1000 ? (
          <ArticulateTeamsMobile />
        ) : (
          <Fragment>
            <ArticulateHeader />
            <ArticulateTeams />
          </Fragment>
        )
      ) : gameState === 'GameInProgress' || gameState === 'GameBegin' ? (
        <ArticulateBoard />
      ) : gameState === 'RoundInProgress' ? (
        <ArticulateRound />
      ) : gameState === 'GameComplete' ? (
        <GameComplete />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  articulate: state.articulate,
});

export default connect(mapStateToProps)(ArticulateHome);
