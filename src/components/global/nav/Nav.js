import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from 'components/imageAssets/s10Icon.png';

import { HOME, LIBRARY } from 'constants/routes';
import ServerConnectButtons from 'components/global/nav/ServerConnectButtons';
import GuestNavButtons from 'components/global/nav/GuestNavButtons';
import Username from './Username';
import SessionNav from './SessionNav';
import PlayersDropdown from './PlayersDropdown';

const styles = {
  navContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: '100vw',
    boxShadow: '0 3px 5px rgba(1,1,1,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff',
  },
};

const Nav = ({ server }) => {
  const history = useHistory();

  return (
    <div style={styles.navContainer}>
      <div style={{ display: 'flex' }}>
        <h1
          onMouseDown={() =>
            server.inGame ? history.push(LIBRARY) : history.push(HOME)
          }
        >
          CC Gaming
        </h1>
        {server.inGame ? <SessionNav /> : null}
      </div>
      <div style={{ display: 'flex', paddingRight: 20, alignItems: 'center' }}>
        <Username />
        {!server.onServer ? (
          <ServerConnectButtons />
        ) : !server.inGame ? (
          <GuestNavButtons />
        ) : (
          <PlayersDropdown />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps)(Nav);
