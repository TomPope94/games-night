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
import Library from 'components/pages/Library';
import CodenamesHome from 'components/games/codenames/CodenamesHome';
import ArticulateHome from 'components/pages/AriculateHome';
import FiveSecondsHome from 'components/pages/FiveSecondsHome';
import GuessPeopleHome from 'components/pages/GuessPeopleHome';
import NamesOfHome from 'components/pages/NamesOfHome';
import Decipher from 'components/pages/Decipher';
import EpicCrackers from 'components/pages/EpicCrackers';

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
  NAMESOF,
  DECIPHER,
  CRACKERS,
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
      color: '#0396a6',
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
            <GameRoute exact path={ARTICULATE} component={ArticulateHome} />
            <GameRoute exact path={FIVESECONDS} component={FiveSecondsHome} />
            <GameRoute exact path={GUESSPEOPLE} component={GuessPeopleHome} />
            <GameRoute exact path={NAMESOF} component={NamesOfHome} />
            <GameRoute exact path={DECIPHER} component={Decipher} />
            <GameRoute exact path={CRACKERS} component={EpicCrackers} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
