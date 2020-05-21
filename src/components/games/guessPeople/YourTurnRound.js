import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PassedWord from 'components/games/articulate/PassedWord';
import GameButton from 'components/global/GameButton';

import { sendRoundScoreUpdate, sendToSummary } from 'actions/guessPeople';

const YourTurnRound = ({
  guessPeople,
  server,
  session,
  sendRoundScoreUpdate,
  sendToSummary,
  category,
}) => {
  const [data, setData] = useState(guessPeople.namesInPlay);
  const [gameWord, setGameWord] = useState({ name: null, id: null });
  const [passedWords, setPassedWords] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [roundEnd, setRoundEnd] = useState(false);

  const styles = {
    roundContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      // zIndex: 9999,
    },
    bigButton: {
      height: '100%',
      width: '50%',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      pointerEvents: roundEnd ? 'none' : 'all',
    },
    correctButton: {
      background: !roundEnd > 0 ? 'green' : 'red',
    },
    passButton: {
      background: !roundEnd > 0 ? 'orange' : 'red',
    },
    score: {
      fontSize: '4rem',
      color: '#fff',
    },
    wordOuterContainer: {
      position: 'absolute',
      top: 100,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    wordInnerContainer: {
      padding: 20,
      background: '#fff',
      borderRadius: 10,
      boxShadow: '0 2px 5px rgba(1,1,1,0.5)',
      position: 'relative',
    },
    discardButton: {
      position: 'absolute',
      top: 0,
      right: 20,
    },
  };

  const getNewWord = () => {
    if (data.length <= 0) {
      setRoundEnd(true);
      return;
    }
    const randomNum = Math.floor(Math.random() * data.length);
    setGameWord(data[randomNum]);
    const chosenWord = data[randomNum];
    setData(data.filter((wordObj) => wordObj.id !== chosenWord.id));
    return chosenWord;
  };
  const correct = (word) => {
    setCorrectWords([...correctWords, word]);
    sendRoundScoreUpdate(
      server.wsConnection,
      session.sessionId,
      guessPeople.roundScore + 1,
      [...correctWords, word]
    );
    if (word === gameWord) {
      getNewWord();
    } else {
      setPassedWords(passedWords.filter((pword) => pword !== word));
    }
  };

  const pass = () => {
    if (passedWords.length < 2) {
      setPassedWords([...passedWords, gameWord]);
      getNewWord();
    }
  };

  useEffect(() => {
    getNewWord();
  }, []);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      setRoundEnd(true);
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
  return (
    <Fragment>
      <div style={{ ...styles.roundContainer }}>
        <div
          style={{
            ...styles.bigButton,
            pointerEvents: roundEnd ? 'all' : 'none',
            zIndex: 999999,
          }}
        >
          {roundEnd ? (
            <GameButton
              background="#fff"
              color="red"
              onMouseDown={async () =>
                await sendToSummary(
                  server.wsConnection,
                  session.sessionId,
                  passedWords,
                  data,
                  category
                )
              }
            >
              <h1>To Summary</h1>
            </GameButton>
          ) : (
            passedWords.map((word) => (
              <PassedWord correct={correct} word={word}>
                <p style={{ fontSize: '2rem' }}>{word.name}</p>
              </PassedWord>
            ))
          )}
        </div>
      </div>
      <div style={{ ...styles.roundContainer, zIndex: 99999 }}>
        <div
          style={{ ...styles.bigButton, ...styles.passButton }}
          onMouseDown={() => pass()}
        ></div>
        <div
          style={{
            ...styles.bigButton,
            ...styles.correctButton,
          }}
          onMouseDown={() => correct(gameWord)}
        >
          <p style={styles.score}>{guessPeople.roundScore}</p>
          {correctWords.map((word) => (
            <p style={{ color: 'white' }}>{word.name}</p>
          ))}
        </div>
        {!roundEnd ? (
          <div style={styles.wordOuterContainer}>
            <div style={styles.wordInnerContainer}>
              <h1>{gameWord.name}</h1>
              <h4>{timeLeft}</h4>
              <p style={styles.discardButton} onMouseDown={() => getNewWord()}>
                <em>X</em>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  guessPeople: state.guessPeople,
});

export default connect(mapStateToProps, {
  sendRoundScoreUpdate,
  sendToSummary,
})(YourTurnRound);
