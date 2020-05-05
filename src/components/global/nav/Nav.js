import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { HOME, LIBRARY } from 'constants/routes';
import ServerConnectButtons from 'components/global/nav/ServerConnectButtons';
import SessionNav from './SessionNav';
import PlayersDropdown from './PlayersDropdown';
import GuestNavLinks from 'components/global/nav/GuestNavLinks';

const styles = {
  navContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: '100vw',
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
      <div style={{ display: 'flex', width: '100%' }}>
        <h1
          onMouseDown={() =>
            server.inGame ? history.push(LIBRARY) : history.push(HOME)
          }
        >
          logo
        </h1>
        {server.inGame ? <SessionNav /> : <GuestNavLinks />}
      </div>
      <div style={{ display: 'flex', paddingRight: 20, alignItems: 'center' }}>
        {/* <Username /> */}
        {!server.onServer ? (
          <ServerConnectButtons />
        ) : server.inGame ? (
          <PlayersDropdown />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps)(Nav);
