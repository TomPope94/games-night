import React, { useState } from 'react';
import { connect } from 'react-redux';

import ArticulateGame from 'components/games/articulate/ArticulateGame';
import TeamPicker from 'components/games/TeamPicker';

import GameButton from 'components/global/GameButton';
import HeroBanner from 'components/global/HeroBanner';
import ArticulateTeams from './ArticulateTeams';

const ArticulateHome = ({ articulate }) => {
  const categories = ['people', 'world', 'object', 'actions', 'nature'];

  const { gameState } = articulate;

  return <div>{gameState === 'TeamSelect' ? <ArticulateTeams /> : null}</div>;
};

const mapStateToProps = (state) => ({
  articulate: state.articulate,
});

export default connect(mapStateToProps)(ArticulateHome);
