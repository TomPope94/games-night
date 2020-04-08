import React from 'react';

const HeroBanner = ({ children, ...props }) => {
  const styles = {
    bannerContainer: {
      background: props.background,
      height: 150,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return <div style={styles.bannerContainer}>{children}</div>;
};

export default HeroBanner;
