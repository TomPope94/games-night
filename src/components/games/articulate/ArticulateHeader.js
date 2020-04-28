import React from 'react';
import { connect } from 'react-redux';

import HeroBanner from 'components/global/HeroBanner';
import GameButton from 'components/global/GameButton';

const styles = {
  headerContainer: {
    position: 'relative',
  },
};

const ArticulateHeader = ({ session }) => {
  return (
    <div style={styles.headerContainer}>
      {session.isHost ? (
        <GameButton
          styling={{ position: 'absolute', right: 0, top: 10 }}
          color="#d66e31"
        >
          <p>Reset Cards</p>
        </GameButton>
      ) : null}
      <HeroBanner background="transparent">
        <h1 style={{ color: 'black' }}>Articulate!</h1>
      </HeroBanner>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(ArticulateHeader);
