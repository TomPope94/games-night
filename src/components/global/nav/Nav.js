import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from 'components/imageAssets/s10Icon.png';

import { HOME } from 'constants/routes';
import GuestNavButtons from 'components/global/nav/GuestNavButtons';

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
      <div onMouseDown={() => history.push(HOME)} style={{ cursor: 'pointer' }}>
        <img
          src={logo}
          style={{
            height: 25,
            top: 0,
            left: 0,
            margin: 25,
          }}
        />
      </div>
      <div style={{ paddingRight: 20 }}>
        {server.inGame ? (
          <div>
            <h1>IN GAME</h1>
          </div>
        ) : (
          <GuestNavButtons />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps)(Nav);
