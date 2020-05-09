import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import GamesList from 'components/games/library/GamesList';
import SocialContainer from 'components/games/library/SocialContainer';
import Loader from 'components/global/Loader';

const styles = {
  libraryContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
};
const Library = ({ server }) => {
  return (
    <div style={styles.libraryContainer}>
      {server.loading ? (
        <Loader />
      ) : (
        <Fragment>
          <GamesList styling={{ width: '75%' }} />
          <SocialContainer styling={{ width: '25%' }} />
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps)(Library);
