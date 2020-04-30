import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import GameRoute from 'components/routing/GameRoute';

import Nav from 'components/global/nav/Nav';
import Alert from 'components/global/Alert';
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

import { connectServer, ping } from 'actions/server';
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
  const [timeActive, setTimeActive] = useState(0);

  useEffect(() => {
    store.dispatch(connectServer());
  }, []);

  useEffect(() => {
    if (timeActive % 120 === 0 && timeActive !== 0) {
      const state = store.getState();
      store.dispatch(ping(state.server.wsConnection));
    }
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeActive(timeActive + 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeActive]);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Nav />
        <Alert />
        <div style={styles.appContainer}>
          <Switch>
            <Route exact path={HOME} component={GamesHome} />
            <Route exact path={JOIN} component={Join} />
            <Route exact path={HOST} component={Host} />
            <GameRoute exact path={LIBRARY} component={Library} />
            <Route exact path={CODENAMES} component={CodenamesHome} />
            <GameRoute exact path={ARTICULATE} component={ArticulateHome} />
            <Route exact path={FIVESECONDS} component={FiveSecondsHome} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
