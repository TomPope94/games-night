import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { sendShowQuestion } from "actions/epicCrackers";

import GameRoundOption from "components/games/epicCrackers/GameRoundOption";
import { Fragment } from "react";
// show the versus
// countdown 10 seconds
// show question

const GameRoundQuestion = ({
  epicCrackers,
  session,
  server,
  sendShowQuestion,
}) => {
  const [timeLeft, setTimeLeft] = useState(10);

  const styles = {
    versusContainer: {
      display: "flex",
      height: "100%",
      width: "100%",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  };

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft && session.isHost) {
      sendShowQuestion(server.wsConnection, session.sessionId);
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (timeLeft <= 0) {
      clearInterval(intervalId);
    }
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <div>
      {Object.keys(epicCrackers.gameQuestion).length === 0 ? (
        <Fragment>
          <div style={styles.versusContainer}>
            <h1>{epicCrackers.nextMatchup[0].Username}</h1>
            <h4>VS</h4>
            <h1>
              {epicCrackers.nextMatchup.length > 1
                ? epicCrackers.nextMatchup[1].Username
                : "No one :("}
            </h1>
          </div>
          <h3>{timeLeft}</h3>
        </Fragment>
      ) : (
        <div>
          <h2>{epicCrackers.gameQuestion.question}</h2>
          {epicCrackers.gameQuestion.options.map((option) => (
            <GameRoundOption key={uuidv4()} text={option} />
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  epicCrackers: state.epicCrackers,
  session: state.session,
  server: state.server,
});

export default connect(mapStateToProps, { sendShowQuestion })(
  GameRoundQuestion
);
