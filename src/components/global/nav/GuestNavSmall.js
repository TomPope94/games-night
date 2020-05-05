import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import NavLink from 'components/global/nav/NavLink';
import MenuIcon from 'components/global/nav/MenuIcon';

import { JOIN, HOST } from 'constants/routes';

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
        <NavLink text="Product" onMouseDown={() => handleLinkClick('/')} />
        <NavLink text="Pricing" onMouseDown={() => handleLinkClick('/')} />
        <NavLink text="About" onMouseDown={() => handleLinkClick('/')} />
        <NavLink text="Join" onMouseDown={() => handleLinkClick(JOIN)} />
        <NavLink text="Host" onMouseDown={() => handleLinkClick(HOST)} />
      </div>
    </div>
  );
};

export default GuestNavSmall;
