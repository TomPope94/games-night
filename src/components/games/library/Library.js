import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import GamesList from 'components/games/library/GamesList';
import SocialContainer from 'components/games/library/SocialContainer';
import Loader from 'components/global/Loader';
import LibraryMobile from 'components/games/library/LibraryMobile';

const styles = {
  libraryContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
};
const Library = ({ server }) => {
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
  }, [window.innerWidth]);

  return (
    <div style={styles.libraryContainer}>
      {server.loading ? (
        <Loader />
      ) : (
        <Fragment>
          {width >= 1000 ? (
            <Fragment>
              <GamesList styling={{ width: '75%' }} mobile={false} />
              <SocialContainer styling={{ width: '25%' }} mobile={false} />
            </Fragment>
          ) : (
            <LibraryMobile />
          )}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
});

export default connect(mapStateToProps)(Library);
