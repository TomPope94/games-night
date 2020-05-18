import React from "react";
import { useHistory } from "react-router-dom";

import { JOIN, HOST } from "constants/routes";

import GameButton from "components/global/GameButton";
import HeroBanner from "components/global/HeroBanner";

const styles = {
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
  },
};

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <HeroBanner background="rgba(0,0,0,0)">
        <h1 style={{ color: "#0396A6" }}>
          Welcome to Collective Cloud Gaming
          <span style={{ color: "#D95A11" }}>!</span>
        </h1>
      </HeroBanner>
      <div style={styles.buttonsContainer}>
        <GameButton onMouseDown={() => history.push(JOIN)} color="#D95A11">
          <h1>Join</h1>
        </GameButton>
        <GameButton onMouseDown={() => history.push(HOST)} color="#D95A11">
          <h1>Host</h1>
        </GameButton>
      </div>
    </div>
  );
};

export default Home;
