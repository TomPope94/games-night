import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import RoundMaster from 'components/games/namesOf/RoundMaster';
import RoundVerdict from 'components/games/namesOf/RoundVerdict';
import RoundPlayer from 'components/games/namesOf/RoundPlayer';

const GameRound = ({ server, session, namesOf }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { width, height } = dimensions;

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerHeight, window.innerWidth]);

  const styles = {
    pageContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    playersContainer: {
      width: '10%',
      boxShadow: '0 1px 3px rgba(1,1,1,0.5)',
      borderRadius: 10,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'auto',
      height: height - 300,
    },
    gameContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '90%',
      height: height - 300,
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.playersContainer}>
        <h2>Player Pool:</h2>
        {namesOf.players.map((player) =>
          player.inPool ? <h4>{player.Username}</h4> : null
        )}
      </div>
      <div style={styles.gameContainer}>
        {namesOf.yourTurn && !namesOf.roundStarted ? (
          <RoundMaster />
        ) : namesOf.yourTurn && namesOf.roundStarted ? (
          <RoundVerdict />
        ) : null}
        {!namesOf.yourTurn && !namesOf.roundStarted ? (
          <Fragment>
            <h2>You are not the master - please stand by!</h2>
          </Fragment>
        ) : !namesOf.yourTurn && namesOf.roundStarted ? (
          <RoundPlayer />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  namesOf: state.namesOf,
});

export default connect(mapStateToProps)(GameRound);
