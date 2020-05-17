import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import BoardQuadrant from 'components/games/articulate/BoardQuadrant';
import GameButton from 'components/global/GameButton';

import { sendNextRound, addRota } from 'actions/guessPeople';

const styles = {
  gameContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100vh',
  },
};

const GameBoard = ({
  guessPeople,
  session,
  server,
  sendNextRound,
  addRota,
}) => {
  const [teamState, setTeamState] = useState([]);

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

    rota.push(teamsArr[guessPeople.gameStarter]);
    teamsArr.splice(guessPeople.gameStarter, 1);
    const numIter = teamsArr.length;
    for (let i = 0; i < numIter; i++) {
      let randomNum = Math.floor(Math.random() * teamsArr.length);
      rota.push(teamsArr[randomNum]);
      teamsArr.splice(randomNum, 1);
    }

    return rota;
  };
  const choosePlayer = (rota, round, refresh) => {
    const teamTurn = rota[round % rota.length];
    let players;

    if (!refresh) {
      players = guessPeople.gameTeams[teamTurn].PlayersLeft;
    } else {
      players = guessPeople.gameTeams[teamTurn].PlayersGone;
    }
    if (players.length > 0) {
      const randNum = Math.floor(Math.random() * players.length);

      return players[randNum];
    } else {
      return 'Pool Empty';
    }
  };

  const checkPools = (rota) => {
    const checkPoolArr = rota.filter(
      (val) => guessPeople.gameTeams[val].PlayersLeft.length === 0
    );
    if (checkPoolArr.length > 0) {
      const playersGoneArr = rota.map(
        (val) => guessPeople.gameTeams[val].PlayersGone.length
      );
      const equalCheck = playersGoneArr.every((val, i, arr) => val === arr[0]);

      return equalCheck;
    } else return false;
  };

  const handleNextRound = async () => {
    // if round is 0, pick the starter team and start the rota
    // else pick the next team in the rota
    // move the state to in game
    // will need logic if the final round (not for now...)
    if (guessPeople.gameRound === 0 && guessPeople.gameStarter !== -1) {
      const rota = await startRota(teamState);
      const player = await choosePlayer(rota, guessPeople.gameRound, false);
      await addRota(rota);

      // debugger;
      await sendNextRound(
        server.wsConnection,
        session.sessionId,
        getTeams(guessPeople.gameTeams)[guessPeople.gameStarter],
        player,
        false
      );
    } else {
      // check if the player pools need refreshing
      const poolsCheck = checkPools(guessPeople.gameRota);

      const player = await choosePlayer(
        guessPeople.gameRota,
        guessPeople.gameRound,
        poolsCheck
      );

      if (player !== 'Pool Empty') {
        await sendNextRound(
          server.wsConnection,
          session.sessionId,
          guessPeople.gameRota[
            guessPeople.gameRound % guessPeople.gameRota.length
          ],
          player,
          poolsCheck
        );
      }
    }
  };

  useEffect(() => {
    const teams = getTeams(guessPeople.gameTeams);
    setTeamState(teams);
  }, []);

  return (
    <div style={styles.gameContainer}>
      {teamState
        ? teamState.map((team) => (
            <BoardQuadrant name={team} details={guessPeople.gameTeams[team]} />
          ))
        : null}
      {session.isHost ? (
        <GameButton
          color="#d66e31"
          styling={{ position: 'absolute', top: '50%', right: 0, zIndex: 999 }}
          onMouseDown={() => handleNextRound()}
        >
          <h3>Next Round</h3>
        </GameButton>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  guessPeople: state.guessPeople,
  session: state.session,
  server: state.server,
});

export default connect(mapStateToProps, { sendNextRound, addRota })(GameBoard);
