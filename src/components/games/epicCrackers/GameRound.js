import React, { useRef } from "react";
import { connect } from "react-redux";
import introVideo from "components/games/epicCrackers/LetsGetCrackin.mp4";

import { finishIntro } from "actions/epicCrackers";

const GameRound = ({ epicCrackers, finishIntro }) => {
  const vidRef = useRef("video");

  const styles = {
    videoContainer: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: 9999,
      minWidth: "100%",
      minHeight: "100%",
    },
  };

  return (
    <div>
      {!epicCrackers.introPlayed ? (
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
      ) : null}
      <h1>Game round goes here!</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  epicCrackers: state.epicCrackers,
});

export default connect(mapStateToProps, { finishIntro })(GameRound);
