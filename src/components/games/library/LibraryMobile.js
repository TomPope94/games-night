import React, { useState, useEffect } from 'react';

import GamesList from 'components/games/library/GamesList';
import SocialContainer from 'components/games/library/SocialContainer';

const LibraryMobile = ({ focus, setfocus }) => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
  });
  const [tabSelected, setTabSelected] = useState('games');

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerHeight]);

  const styles = {
    buttonsRow: {
      display: focus ? 'none' : 'flex',
      width: '100%',
      position: 'fixed',
      bottom: 0,
    },
    button: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      width: '50%',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={{ width: '100%' }}>
      {tabSelected === 'games' ? (
        <GamesList
          styling={{ width: '100%', marginBottom: 200 }}
          mobile={true}
        />
      ) : tabSelected === 'social' ? (
        <SocialContainer
          styling={{ width: '100%' }}
          mobile={true}
          focus={focus}
          setfocus={setfocus}
        />
      ) : null}
      <div style={styles.buttonsRow}>
        <div
          style={{
            ...styles.button,
            background: tabSelected === 'games' ? '#273859' : '#fff',
            color: tabSelected === 'games' ? '#fff' : '#d9145c',
          }}
          onMouseDown={() => setTabSelected('games')}
        >
          <h3>Games</h3>
        </div>
        <div
          style={{
            ...styles.button,
            background: tabSelected === 'social' ? '#273859' : '#fff',
            color: tabSelected === 'social' ? '#fff' : '#d9145c',
          }}
          onMouseDown={() => setTabSelected('social')}
        >
          <h3>Social</h3>
        </div>
      </div>
    </div>
  );
};

export default LibraryMobile;
