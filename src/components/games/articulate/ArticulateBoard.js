import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import BoardQuadrant from 'components/games/articulate/BoardQuadrant';
import GameButton from 'components/global/GameButton';

import { sendNextRound, addRota, sendEndGame } from 'actions/articulate';

const ArticulateBoard = ({
  articulate,
  session,
  server,
  sendNextRound,
  addRota,
  sendEndGame,
}) => {
  const [teamState, setTeamState] = useState([]);
  const [numTeams, setNumTeams] = useState(0);

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
    gameContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: '100%',
      overflow: 'auto',
      height: height - 100,
    },
  };

  const getTeams = (teams) => {
    const arr = Object.values(teams);
    const playingArr = [];
    for (let i = 0; i < arr.length; i++) {
      const players = arr[i].Players;

      if (players.length > 1) {
        playingArr.push(i);
      }
    }

    const teamNames = playingArr.map((index) => Object.keys(teams)[index]);
    return teamNames;
  };

  const startRota = (teams) => {
    const teamsArr = teams;
    const rota = [];

    rota.push(teamsArr[articulate.gameStarter]);
    teamsArr.splice(articulate.gameStarter, 1);
    const numIter = teamsArr.length;
    for (let i = 0; i < numIter; i++) {
      let randomNum = Math.floor(Math.random() * teamsArr.length);
      rota.push(teamsArr[randomNum]);
      teamsArr.splice(randomNum, 1);
    }

    return rota;
  };
  const choosePlayer = (rota, round) => {
    const teamTurn = rota[round % rota.length];

    const players = articulate.gameTeams[teamTurn].PlayersLeft;
    if (players.length > 0) {
      const randNum = Math.floor(Math.random() * players.length);

      return players[randNum];
    } else {
      return 'Pool Empty';
    }
  };

  const checkWin = (rota) => {
    const checkPoolArr = rota.filter(
      (val) => articulate.gameTeams[val].PlayersLeft.length === 0
    );
    if (checkPoolArr.length > 0) {
      const playersGoneArr = rota.map(
        (val) => articulate.gameTeams[val].PlayersGone.length
      );
      const equalCheck = playersGoneArr.every((val, i, arr) => val === arr[0]);

      return equalCheck;
    } else return false;
  };

  const handleNextRound = async () => {
    // if round is 0, pick the starter team and start the rota
    // else pick the next team in the rota
    // move the state to in game
    if (articulate.gameRound === 0 && articulate.gameStarter !== -1) {
      const rota = await startRota(teamState);
      const player = await choosePlayer(rota, articulate.gameRound);
      await addRota(rota);

      // debugger;
      await sendNextRound(
        server.wsConnection,
        session.sessionId,
        getTeams(articulate.gameTeams)[articulate.gameStarter],
        player,
        false
      );
    } else {
      // check for end game condition
      // if a player pool is empty, check to see if all the playersGone arrays are equal in length
      // if false, continue
      // if true, move to end of game screen
      const gameComplete = checkWin(articulate.gameRota);

      const player = await choosePlayer(
        articulate.gameRota,
        articulate.gameRound
      );
      if (gameComplete) {
        await sendNextRound(
          server.wsConnection,
          session.sessionId,
          articulate.gameRota[
            articulate.gameRound % articulate.gameRota.length
          ],
          player,
          true
        );
      }

      if (player !== 'Pool Empty') {
        await sendNextRound(
          server.wsConnection,
          session.sessionId,
          articulate.gameRota[
            articulate.gameRound % articulate.gameRota.length
          ],
          player,
          false
        );
      }
    }
  };

  useEffect(() => {
    const teams = getTeams(articulate.gameTeams);
    setTeamState(teams);
    setNumTeams(teams.length);
  }, []);

  return (
    <div style={styles.gameContainer}>
      {teamState
        ? teamState.map((team) => (
            <BoardQuadrant
              name={team}
              mobile={width < 1000}
              details={articulate.gameTeams[team]}
            />
          ))
        : null}
      {session.isHost ? (
        <Fragment>
          <GameButton
            color="#d9145c"
            styling={{ position: 'absolute', top: 100, left: 0, zIndex: 999 }}
            onMouseDown={async () =>
              await sendEndGame(server.wsConnection, session.sessionId)
            }
          >
            <h3>End Game.</h3>
          </GameButton>
          <GameButton
            color="#d9145c"
            styling={{
              position: 'absolute',
              top: '50%',
              right: 0,
              zIndex: 999,
            }}
            onMouseDown={() => handleNextRound()}
          >
            <h3>Next Round</h3>
          </GameButton>
        </Fragment>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  articulate: state.articulate,
  session: state.session,
  server: state.server,
});

export default connect(mapStateToProps, {
  sendNextRound,
  addRota,
  sendEndGame,
})(ArticulateBoard);
