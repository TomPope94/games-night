import React, { useState, useEffect, Fragment } from 'react';
import ArticulateData from 'constants/ArticulateData';

import PassedWord from 'components/articulate/PassedWord';

const ArticulateRound = ({ category, ...props }) => {
  const data = ArticulateData[category];

  const [gameWord, setGameWord] = useState(null);
  const [score, setScore] = useState(0);
  const [passedWords, setPassedWords] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  const styles = {
    roundContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
    },
    bigButton: {
      height: '100%',
      width: '50%',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    correctButton: {
      background: timeLeft > 0 ? 'green' : 'red',
    },
    passButton: {
      background: timeLeft > 0 ? 'orange' : 'red',
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
    },
  };

  const getNewWord = () => {
    const randomNum = Math.floor(Math.random() * data.length);
    setGameWord(data[randomNum]);
    data.splice(randomNum, 1); // Stops you from getting the same word twice
    return data[randomNum];
  };
  const correct = (word) => {
    setCorrectWords([...correctWords, word]);
    setScore(score + 1);
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
    if (!timeLeft) return;

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
      <div style={styles.roundContainer}>
        <div style={{ ...styles.bigButton, pointerEvents: 'none' }}>
          {passedWords.map((word) => (
            <PassedWord correct={correct} word={word}>
              <p style={{ fontSize: '2rem' }}>{word}</p>
            </PassedWord>
          ))}
        </div>
      </div>
      <div style={styles.roundContainer}>
        <div
          style={{ ...styles.bigButton, ...styles.passButton }}
          onMouseDown={() => pass()}
        >
          {/* {passedWords.map((word) => (
              <PassedWord correct={correct} word={word}>
                <p style={{ fontSize: '2rem' }}>{word}</p>
              </PassedWord>
            ))} */}
        </div>
        <div
          style={{ ...styles.bigButton, ...styles.correctButton }}
          onMouseDown={() => correct(gameWord)}
        >
          <p style={styles.score}>{score}</p>
          {correctWords.map((word) => (
            <p style={{ color: 'white' }}>{word}</p>
          ))}
        </div>
        {timeLeft > 0 ? (
          <div style={styles.wordOuterContainer}>
            <div style={styles.wordInnerContainer}>
              <h1>{gameWord}</h1>
              <h4>{timeLeft}</h4>
            </div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default ArticulateRound;