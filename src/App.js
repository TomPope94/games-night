import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import GameRoute from 'components/routing/GameRoute';

import Nav from 'components/global/nav/Nav';
import Alert from 'components/global/Alert';
import GamesHome from 'components/Home';
import Join from 'components/serverPages/Join';
import Host from 'components/serverPages/Host';
import Product from 'components/serverPages/Product';
import Pricing from 'components/serverPages/Pricing';
import About from 'components/serverPages/About';
import Library from 'components/games/library/Library';
import CodenamesHome from 'components/games/codenames/CodenamesHome';
import ArticulateHome from 'components/games/articulate/AriculateHome';
import FiveSecondsHome from 'components/games/fiveseconds/FiveSecondsHome';
import GuessPeopleHome from 'components/games/guessPeople/GuessPeopleHome';

import {
  HOME,
  JOIN,
  HOST,
  PRODUCT,
  PRICING,
  ABOUT,
  LIBRARY,
  CODENAMES,
  ARTICULATE,
  FIVESECONDS,
  GUESSPEOPLE,
} from 'constants/routes';

import { connectServer, ping } from 'actions/server';
import { Provider } from 'react-redux';
import store from 'store';

const App = () => {
  const [timeActive, setTimeActive] = useState(0);
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

  const styles = {
    appContainer: {
      marginTop: 100,
      paddingLeft: width >= 1000 ? 50 : 0,
      paddingRight: width >= 1000 ? 50 : 0,
      background: '#fff',
      width: width >= 1000 ? 'auto' : '100vw',
      height: '100vh',
      overflow: 'overlay',
      color: '#273859',
    },
  };
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
            <Route exact path={PRODUCT} component={Product} />
            <Route exact path={PRICING} component={Pricing} />
            <Route exact path={ABOUT} component={About} />
            <GameRoute exact path={LIBRARY} component={Library} />
            <Route exact path={CODENAMES} component={CodenamesHome} />
            <Route exact path={ARTICULATE} component={ArticulateHome} />
            <GameRoute exact path={FIVESECONDS} component={FiveSecondsHome} />
            <GameRoute exact path={GUESSPEOPLE} component={GuessPeopleHome} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
