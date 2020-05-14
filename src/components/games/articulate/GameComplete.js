import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import GameButton from 'components/global/GameButton';

import { sendEndGame } from 'actions/articulate';

const GameComplete = ({ server, session, articulate, sendEndGame }) => {
  const [winners, setWinners] = useState('');

  const getTopTeam = () => {
    const teams = ['Red', 'Blue', 'Orange', 'Green'];

    const scores = teams.map((team) => articulate.gameTeams[team].Pos);
    const maxIndex = scores.indexOf(Math.max(...scores));

    return teams[maxIndex];
  };

  useEffect(() => {
    const topTeam = getTopTeam();
    setWinners(topTeam);
  }, []);

  return (
    <Fragment>
      {session.isHost ? (
        <GameButton
          color="#d9145c"
          styling={{ position: 'absolute', top: 100, left: 0, zIndex: 999 }}
          onMouseDown={async () =>
            await sendEndGame(server.wsConnection, session.sessionId)
          }
        >
          <h3>End Game.</h3>
        </GameButton>
      ) : null}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>The Game is Over!</h1>
        <h2>Congratulations {winners} team!</h2>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  articulate: state.articulate,
});

export default connect(mapStateToProps, { sendEndGame })(GameComplete);
