import React, { useEffect, useState } from 'react';
import NavLink from 'components/global/nav/NavLink';

import { JOIN, HOST } from 'constants/routes';
import GuestNavLarge from 'components/global/nav/GuestNavLarge';
import GuestNavSmall from 'components/global/nav/GuestNavSmall';

const GuestNavLinks = () => {
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
  });

  return width >= 650 ? <GuestNavLarge /> : <GuestNavSmall />;
};

export default GuestNavLinks;
