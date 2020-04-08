import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import Home from 'components/Home';
import CodenamesHome from 'components/codenames/CodenamesHome';
import ArticulateHome from 'components/articulate/AriculateHome';
import FiveSecondsHome from 'components/fiveseconds/FiveSecondsHome';

import { HOME, CODENAMES, ARTICULATE, FIVESECONDS } from 'constants/routes';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={HOME} component={Home} />
        <Route exact path={CODENAMES} component={CodenamesHome} />
        <Route exact path={ARTICULATE} component={ArticulateHome} />
        <Route exact path={FIVESECONDS} component={FiveSecondsHome} />
      </Switch>
    </Router>
  );
};

export default App;
