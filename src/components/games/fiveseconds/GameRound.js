import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GameButton from 'components/global/GameButton';

import { sendStartRound, sendDataReset } from 'actions/fiveSeconds';
import GameVote from './GameVote';
import GameQuestion from './GameQuestion';

const styles = {
  roundContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  playersRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  playersContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '10%',
    background: '#fff',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 3px 5px rgba(1,1,1,0.5)',
    marginBottom: 15,
  },
};

const GameRound = ({ server, session, fiveSeconds, sendStartRound }) => {
  const data = fiveSeconds.gameData.cards;
  const [gameWord, setGameWord] = useState(null);

  const getNewWord = () => {
    const randomNum = Math.floor(Math.random() * data.length);
    setGameWord(data[randomNum]);
    data.splice(randomNum, 1); // Stops you from getting the same word twice
    return data[randomNum];
  };
  useEffect(() => {
    getNewWord();
  }, []);

  const deadPlayers = fiveSeconds.players.filter((player) => player.lives <= 0);
  const livePlayers = fiveSeconds.players.filter(
    (player) => player.lives > 0 && !player.completed
  );
  const survivedPlayers = fiveSeconds.players.filter(
    (player) => player.lives > 0 && player.completed
  );

  const getNextPlayer = (liveArr) => {
    const randNum = Math.floor(Math.random() * liveArr.length);
    const nextTurn = liveArr[randNum];

    return nextTurn;
  };

  const handleBegin = async () => {
    const nextPlayer = await getNextPlayer(livePlayers);

    await sendStartRound(
      server.wsConnection,
      session.sessionId,
      nextPlayer,
      gameWord
    );
  };

  return (
    <div style={styles.roundContainer}>
      {fiveSeconds.gameRound < 1 ? (
        <h2>Are you ready?</h2>
      ) : (
        <h2>Round {fiveSeconds.gameRound}</h2>
      )}
      <div style={styles.playersRow}>
        <div style={{ ...styles.playersContainer, alignItems: 'flex-start' }}>
          <h2>Alive:</h2>
          {livePlayers.map((player) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <h4>{player.Username}</h4>
              <h4>{player.lives}</h4>
            </div>
          ))}
        </div>
        <div
          style={{ width: '50%', display: 'flex', justifyContent: 'center' }}
        >
          {!fiveSeconds.roundRoundStarted ? (
            <GameButton color="#d66e31" onMouseDown={() => handleBegin()}>
              <h1>Begin!</h1>
            </GameButton>
          ) : fiveSeconds.roundRoundStarted &&
            !fiveSeconds.roundRoundComplete ? (
            <GameQuestion />
          ) : (
            <GameVote />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '10%' }}>
          <div
            style={{
              ...styles.playersContainer,
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <h2>Dead:</h2>
            {deadPlayers.map((player) => (
              <h4 style={{ color: 'red' }}>{player.Username}</h4>
            ))}
          </div>
          <div
            style={{
              ...styles.playersContainer,
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <h2>Survived:</h2>
            {survivedPlayers.map((player) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  color: 'green',
                }}
              >
                <h4>{player.Username}</h4>
                <h4>{player.lives}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  fiveSeconds: state.fiveSeconds,
});

export default connect(mapStateToProps, { sendStartRound })(GameRound);
