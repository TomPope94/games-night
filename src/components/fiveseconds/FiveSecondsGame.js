import React, { useState, useEffect } from 'react';
import GameButton from 'components/global/GameButton';

const FiveSecondsGame = ({ word, ...props }) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const styles = {
    gameContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    finishedContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      display: timeLeft <= 0 && timerStarted ? 'flex' : 'none',
    },
  };

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    // let intervalId;
    // if (timerStarted) {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
  return (
    <div style={styles.gameContainer}>
      <h1>{word}</h1>
      <GameButton
        onMouseDown={() => {
          setTimerStarted(true);
          setTimeLeft(5);
        }}
        color='black'
      >
        <h3>Start Timer</h3>
      </GameButton>
      {timerStarted ? <h1>{timeLeft}</h1> : null}
      <div style={styles.finishedContainer}>
        <GameButton
          onMouseDown={() => {
            setTimerStarted(false);
            setTimeLeft(0);
          }}
          background='#fff'
          color='black'
        >
          <h1>Restart</h1>
        </GameButton>
      </div>
    </div>
  );
};

export default FiveSecondsGame;
