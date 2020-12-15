import React from "react";
import { connect } from "react-redux";
import introVideo from "components/games/epicCrackers/LetsGetCrackin.mp4";

import { finishIntro } from "actions/epicCrackers";

const GameRound = ({ epicCrackers, finishIntro }) => {
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
          style={styles.videoContainer}
          autoPlay="autoplay"
          onEnded={finishIntro}
        >
          <source src={introVideo} type="video/mp4" />
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
