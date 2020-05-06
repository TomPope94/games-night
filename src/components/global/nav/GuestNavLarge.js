import React from 'react';
import NavLink from 'components/global/nav/NavLink';

import { JOIN, HOST, PRICING, PRODUCT, ABOUT } from 'constants/routes';

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
      <div style={{ ...styles.buttonsContainer, width: '40%' }}>
        <NavLink text="Product" route={PRODUCT} />
        <NavLink text="Pricing" route={PRICING} />
        <NavLink text="About" route={ABOUT} />
      </div>
      <div style={{ ...styles.buttonsContainer, width: '20%' }}>
        <NavLink text="Join" route={JOIN} />
        <NavLink text="Host" route={HOST} />
      </div>
    </div>
  );
};

export default GuestNavLarge;
