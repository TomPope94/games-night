import React from 'react';
import NavLink from 'components/global/nav/NavLink';

import { JOIN, HOST } from 'constants/routes';

const GuestNavLarge = () => {
  const styles = {
    navLinks: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      marginLeft: 40,
    },
    buttonsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  };

  return (
    <div style={styles.navLinks}>
      <div style={styles.buttonsContainer}>
        <NavLink text="Product" route="/" />
        <NavLink text="Pricing" route="/" />
        <NavLink text="About" route="/" />
      </div>
      <div style={styles.buttonsContainer}>
        <NavLink text="Join" route={JOIN} />
        <NavLink text="Host" route={HOST} />
      </div>
    </div>
  );
};

export default GuestNavLarge;
