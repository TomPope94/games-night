import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { sendStartRound } from 'actions/fiveSeconds';
import { setAlert } from 'actions/alert';

import GameButton from 'components/global/GameButton';
import GameQuestion from 'components/games/fiveseconds/GameQuestion';
import GameVote from 'components/games/fiveseconds/GameVote';

const GameRoundMobile = ({
  server,
  session,
  fiveSeconds,
  sendStartRound,
  setAlert,
  height,
}) => {
  const [data, setData] = useState(fiveSeconds.gameData.cards);
  const [livePlayers, setLivePlayers] = useState([]);
  const [deadPlayers, setDeadPlayers] = useState([]);
  const [survivedPlayers, setSurvivedPlayers] = useState([]);

  const styles = {
    roundContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 250,
    },
    playersRow: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    playersContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '75%',
      background: '#fff',
      padding: 20,
      borderRadius: 10,
      boxShadow: '0 3px 5px rgba(1,1,1,0.5)',
      marginBottom: 15,
      overflowY: 'hidden',
      overflowX: 'auto',
    },
  };

  const getNewWord = () => {
    const randomNum = Math.floor(Math.random() * data.length);
    const word = data[randomNum];
    setData(data.filter((dataWord) => dataWord !== word)); // Stops you from getting the same word twice
    return word;
  };

  const getNextPlayer = (liveArr) => {
    const randNum = Math.floor(Math.random() * liveArr.length);
    const nextTurn = liveArr[randNum];

    return nextTurn;
  };

  useEffect(() => {
    setDeadPlayers(fiveSeconds.players.filter((player) => player.lives <= 0));
    setLivePlayers(
      fiveSeconds.players.filter(
        (player) => player.lives > 0 && !player.completed
      )
    );
    setSurvivedPlayers(
      fiveSeconds.players.filter(
        (player) => player.lives > 0 && player.completed
      )
    );
  }, [fiveSeconds.players]);

  useEffect(() => {
    async function nextUp() {
      const nextPlayer = await getNextPlayer(livePlayers);
      const gameWord = await getNewWord();

      await sendStartRound(
        server.wsConnection,
        session.sessionId,
        nextPlayer,
        gameWord
      );
    }

    if (
      session.isHost &&
      fiveSeconds.roundStarted &&
      !fiveSeconds.roundRoundStarted &&
      fiveSeconds.gameQuestion !== 'RoundEnd'
    ) {
      nextUp();
    }
  }, [fiveSeconds.roundRoundStarted]);

  const handleBegin = async () => {
    if (session.isHost) {
      const nextPlayer = await getNextPlayer(livePlayers);
      const gameWord = await getNewWord();

      await sendStartRound(
        server.wsConnection,
        session.sessionId,
        nextPlayer,
        gameWord,
        fiveSeconds.gameRound
      );
    } else {
      await setAlert('Only the host can start rounds!', 'neutral');
    }
  };

  const handleNextRound = async () => {
    if (session.isHost) {
      const nextPlayer = await getNextPlayer(survivedPlayers);
      const gameWord = await getNewWord();
      const newRound = fiveSeconds.gameRound + 1;

      await sendStartRound(
        server.wsConnection,
        session.sessionId,
        nextPlayer,
        gameWord,
        newRound
      );
    } else {
      await setAlert('Only the host can start rounds!', 'neutral');
    }
  };

  return (
    <div style={styles.roundContainer}>
      {fiveSeconds.gameRound < 1 ? (
        <h2>Are you ready?</h2>
      ) : (
        <h2>Round {fiveSeconds.gameRound}</h2>
      )}
      <div style={styles.playersRow}>
        <div
          style={{
            ...styles.playersContainer,
            width: '75%',
            alignItems: 'center',
          }}
        >
          <h2>Alive:</h2>
          <div style={{ display: 'flex' }}>
            {livePlayers.map((player) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 75,
                }}
              >
                <h4>{player.Username}</h4>
                <h4>{player.lives}</h4>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{ width: '50%', display: 'flex', justifyContent: 'center' }}
        >
          {!fiveSeconds.roundRoundStarted ? (
            <GameButton color="#d9145c" onMouseDown={() => handleBegin()}>
              <h1>Begin!</h1>
            </GameButton>
          ) : fiveSeconds.roundComplete ? (
            <GameButton color="#d9145c" onMouseDown={() => handleNextRound()}>
              <h1>Next Round...</h1>
            </GameButton>
          ) : fiveSeconds.roundRoundStarted &&
            !fiveSeconds.roundRoundComplete ? (
            <GameQuestion />
          ) : !fiveSeconds.roundComplete ? (
            <GameVote mobile={true} />
          ) : null}
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <div
            style={{
              ...styles.playersContainer,
              alignItems: 'flex-start',
              width: '50%',
            }}
          >
            <h2>Dead:</h2>
            <div style={{ display: 'flex' }}>
              {deadPlayers.map((player) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 75,
                  }}
                >
                  <h4 style={{ color: 'red' }}>{player.Username}</h4>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              ...styles.playersContainer,
              alignItems: 'flex-start',
              width: '50%',
            }}
          >
            <h2>Survived:</h2>
            <div style={{ display: 'flex' }}>
              {survivedPlayers.map((player) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 75,
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  fiveSeconds: state.fiveSeconds,
});

export default connect(mapStateToProps, { sendStartRound, setAlert })(
  GameRoundMobile
);
