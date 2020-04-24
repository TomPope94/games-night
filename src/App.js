import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import Nav from 'components/global/Nav';
import GamesHome from 'components/GamesHome';
import CodenamesHome from 'components/codenames/CodenamesHome';
import ArticulateHome from 'components/articulate/AriculateHome';
import FiveSecondsHome from 'components/fiveseconds/FiveSecondsHome';

import { HOME, CODENAMES, ARTICULATE, FIVESECONDS } from 'constants/routes';

import { Provider } from 'react-redux';
import store from 'store';

const styles = {
  appContainer: {
    marginTop: 75,
    paddingLeft: 50,
    paddingRight: 50,
    background: 'rgba(0,0,0,.03)',
    height: '100vh',
    overflow: 'overlay',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Nav />
        <div style={styles.appContainer}>
          <Switch>
            <Route exact path={HOME} component={GamesHome} />
            <Route exact path={CODENAMES} component={CodenamesHome} />
            <Route exact path={ARTICULATE} component={ArticulateHome} />
            <Route exact path={FIVESECONDS} component={FiveSecondsHome} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
