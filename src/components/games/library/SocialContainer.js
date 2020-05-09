import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Players from 'components/games/library/Players';
import Chat from 'components/games/library/Chat';

const SocialContainer = ({ session, ...props }) => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
  });
  const [tabSelected, setTabSelected] = useState('players');

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
  });

  const styles = {
    socialContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: 20,
      background: '#273859',
      borderRadius: 10,
      color: '#fff',
      height: dimensions.height - 100,
      ...props.styling,
    },
    buttonsRow: {
      display: 'flex',
      width: '100%',
      minHeight: 100,
    },
    button: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.socialContainer}>
      {tabSelected === 'players' ? <Players /> : <Chat />}
      <div>
        <div style={styles.buttonsRow}>
          <div
            style={{
              ...styles.button,
              background: tabSelected === 'players' ? '#273859' : '#fff',
              color: tabSelected === 'players' ? '#fff' : '#d9145c',
            }}
            onMouseDown={() => setTabSelected('players')}
          >
            <h3>Players</h3>
          </div>
          <div
            style={{
              ...styles.button,
              background: tabSelected === 'feed' ? '#273859' : '#fff',
              color: tabSelected === 'feed' ? '#fff' : '#d9145c',
            }}
            onMouseDown={() => setTabSelected('feed')}
          >
            <h3>Feed</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(SocialContainer);
