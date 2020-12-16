import React from "react";
import { connect } from "react-redux";

import { sendEndGame, sendResetData } from "actions/epicCrackers";

import GameButton from "components/global/GameButton";
import HeroBanner from "components/global/HeroBanner";
import { Fragment } from "react";

const Header = ({ server, session, namesOf, sendEndGame, sendResetData }) => {
  const styles = {
    headerContainer: {
      position: "relative",
      width: namesOf.gameState === "setup" ? "75%" : "100%",
    },
  };
  return (
    <div style={styles.headerContainer}>
      {session.isHost ? (
        <Fragment>
          <GameButton
            styling={{ position: "absolute", left: 0, top: 10 }}
            color="#d9145c"
            onMouseDown={() =>
              sendEndGame(server.wsConnection, session.sessionId)
            }
          >
            <p>End Game</p>
          </GameButton>
          <GameButton
            styling={{ position: "absolute", right: 0, top: 10 }}
            color="#d9145c"
            onMouseDown={() =>
              sendResetData(server.wsConnection, session.sessionId)
            }
          >
            <p>Reset Cards</p>
          </GameButton>
        </Fragment>
      ) : null}
      <HeroBanner background="transparent">
        <h1 style={{ color: "#0396A6" }}>Epic Crackers!</h1>
      </HeroBanner>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
  namesOf: state.namesOf,
});

export default connect(mapStateToProps, { sendEndGame, sendResetData })(Header);
