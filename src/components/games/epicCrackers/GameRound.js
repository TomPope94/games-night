import React, { useRef } from "react";
import { connect } from "react-redux";

import { finishIntro, sendStartRound } from "actions/epicCrackers";
import GameButton from "components/global/GameButton";
import GameRoundQuestion from "components/games/epicCrackers/GameRoundQuestion";

const GameRound = ({
  server,
  session,
  epicCrackers,
  finishIntro,
  sendStartRound,
}) => {
  const vidRef = useRef("video");

  const styles = {
    videoContainer: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: epicCrackers.introPlayed ? -1 : 9999,
      minWidth: "100%",
      minHeight: "100%",
    },
  };

  const handleBegin = () => {
    sendStartRound(server.wsConnection, session.sessionId);
  };

  return (
    <div>
      {!epicCrackers.roundStarted ? (
        !epicCrackers.introPlayed ? (
          <video
            ref={vidRef}
            style={styles.videoContainer}
            onEnded={finishIntro}
            onCanPlayThrough={() => vidRef.current.play()}
          >
            <source
              src="https://games-night-data.s3-eu-west-1.amazonaws.com/epicCrackers/LetsGetCrackin.mp4"
              type="video/mp4"
            />
          </video>
        ) : session.isHost ? (
          <GameButton color="#d9145c" onMouseDown={handleBegin}>
            <h2>Start game!</h2>
          </GameButton>
        ) : (
          <div>
            <h2>Get your game faces on!</h2>
            <h4>The host will start shortly...</h4>
          </div>
        )
      ) : (
        <GameRoundQuestion />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  epicCrackers: state.epicCrackers,
  session: state.session,
  server: state.server,
});

export default connect(mapStateToProps, { finishIntro, sendStartRound })(
  GameRound
);
