import React from "react";
import { connect } from "react-redux";

import GameSetup from "components/games/epicCrackers/GameSetup";
import GameRound from "components/games/epicCrackers/GameRound";
import Header from "components/games/epicCrackers/Header";

const EpicCrackers = ({ epicCrackers }) => {
  const styles = {
    gameContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  };

  return (
    <div>
      <Header />
      <div style={styles.gameContainer}>
        {epicCrackers.gameState === "setup" ? (
          <GameSetup />
        ) : epicCrackers.gameState === "BeginGame" ||
          epicCrackers.gameState === "GameInProgress" ? (
          <GameRound />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  epicCrackers: state.epicCrackers,
});

export default connect(mapStateToProps)(EpicCrackers);
