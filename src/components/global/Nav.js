import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from 'components/imageAssets/s10Icon.png';

import { HOME } from 'constants/routes';

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

const Nav = () => {
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
        <div>Join</div>
        <div>Players</div>
      </div>
    </div>
  );
};

export default Nav;
