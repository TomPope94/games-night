import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import GameRoute from 'components/routing/GameRoute';

import Nav from 'components/global/nav/Nav';
import GamesHome from 'components/Home';
import Join from 'components/serverPages/Join';
import Host from 'components/serverPages/Host';
import Library from 'components/games/Library';
import CodenamesHome from 'components/games/codenames/CodenamesHome';
import ArticulateHome from 'components/games/articulate/AriculateHome';
import FiveSecondsHome from 'components/games/fiveseconds/FiveSecondsHome';

import {
  HOME,
  JOIN,
  HOST,
  LIBRARY,
  CODENAMES,
  ARTICULATE,
  FIVESECONDS,
} from 'constants/routes';

import { connectServer } from 'actions/server';
import { Provider } from 'react-redux';
import store from 'store';

const styles = {
  appContainer: {
    marginTop: 80,
    paddingLeft: 50,
    paddingRight: 50,
    background: 'rgba(0,0,0,.03)',
    height: '100vh',
    overflow: 'overlay',
  },
};

const App = () => {
  useEffect(() => {
    store.dispatch(connectServer());
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Nav />
        <div style={styles.appContainer}>
          <Switch>
            <Route exact path={HOME} component={GamesHome} />
            <Route exact path={JOIN} component={Join} />
            <Route exact path={HOST} component={Host} />
            <GameRoute exact path={LIBRARY} component={Library} />
            <GameRoute exact path={CODENAMES} component={CodenamesHome} />
            <GameRoute exact path={ARTICULATE} component={ArticulateHome} />
            <GameRoute exact path={FIVESECONDS} component={FiveSecondsHome} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
