import React from "react";
import { connect } from "react-redux";

import { sendEndGame } from "actions/guessPeople";

import HeroBanner from "components/global/HeroBanner";
import GameButton from "components/global/GameButton";

const styles = {
  headerContainer: {
    position: "relative",
  },
};

const Header = ({ server, session, sendEndGame }) => {
  return (
    <div style={styles.headerContainer}>
      {session.isHost ? (
        <GameButton
          styling={{ position: "absolute", left: 0, top: 10 }}
          color="#d66e31"
          onMouseDown={() =>
            sendEndGame(server.wsConnection, session.sessionId)
          }
        >
          <p>End Game</p>
        </GameButton>
      ) : null}
      <HeroBanner background="transparent">
        <h1 style={{ color: "#0396A6" }}>Guess the People</h1>
      </HeroBanner>
    </div>
  );
};

const mapStateToProps = (state) => ({
  server: state.server,
  session: state.session,
});

export default connect(mapStateToProps, { sendEndGame })(Header);
