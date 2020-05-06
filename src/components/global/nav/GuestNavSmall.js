import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import NavLink from 'components/global/nav/NavLink';
import MenuIcon from 'components/global/nav/MenuIcon';

import { JOIN, HOST, PRODUCT, PRICING, ABOUT } from 'constants/routes';

const GuestNavSmall = () => {
  const history = useHistory();
  const [closed, setClosed] = useState(true);

  const styles = {
    navContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
    },
    dropDownContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      transform: !closed ? 'scaleY(1)' : 'scaleY(0)',
      transition: '0.2s linear',
      transformOrigin: 'center top',
      background: '#fff',
      width: '100vw',
      height: '100vh',
      boxShadow: '0 3px 5px rgba(1,1,1,0.3)',
    },
  };

  const handleLinkClick = (route) => {
    history.push(route);
    setClosed(true);
  };

  return (
    <div style={styles.navContainer}>
      <MenuIcon closed={closed} onMouseDown={() => setClosed(!closed)} />
      <div style={styles.dropDownContainer}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexGrow: 10,
          }}
        >
          <NavLink
            text="Product"
            onMouseDown={() => handleLinkClick(PRODUCT)}
          />
          <NavLink
            text="Pricing"
            onMouseDown={() => handleLinkClick(PRICING)}
          />
          <NavLink text="About" onMouseDown={() => handleLinkClick(ABOUT)} />
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <div
            style={{
              width: '50%',
              background: '#2a2773',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onMouseDown={() => handleLinkClick(JOIN)}
          >
            <NavLink text="Join" />
          </div>
          <div
            style={{
              width: '50%',
              background: '#273859',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onMouseDown={() => handleLinkClick(HOST)}
          >
            <NavLink text="Host" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestNavSmall;
