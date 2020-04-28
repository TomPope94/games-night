import React, { useState } from 'react';
import { connect } from 'react-redux';

import ArticulateTeams from 'components/games/articulate/ArticulateTeams';
import ArticulateHeader from 'components/games/articulate/ArticulateHeader';

const ArticulateHome = ({ articulate }) => {
  // const categories = ['people', 'world', 'object', 'actions', 'nature'];
  const { gameState } = articulate;

  return (
    <div>
      <ArticulateHeader />
      {gameState === 'TeamSelect' ? <ArticulateTeams /> : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  articulate: state.articulate,
});

export default connect(mapStateToProps)(ArticulateHome);
