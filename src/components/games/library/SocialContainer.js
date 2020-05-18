import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Players from "components/games/library/Players";
import Chat from "components/games/library/Chat";

const SocialContainer = ({ session, mobile, focus, setfocus, ...props }) => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
  });
  const [tabSelected, setTabSelected] = useState("feed");

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerHeight]);

  const styles = {
    socialContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingTop: 20,
      background: "#D95A11",
      borderRadius: 10,
      color: "#fff",
      height: dimensions.height - 100,
      position: "relative",
      ...props.styling,
    },
    buttonsRow: {
      display: mobile && focus ? "none" : "flex",
      position: mobile ? "absolute" : "auto",
      top: 0,
      minHeight: mobile ? 0 : 100,
      width: "100%",
    },
    button: {
      display: "flex",
      height: "100%",
      justifyContent: "center",
      width: "50%",
      color: "#fff",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.socialContainer}>
      {tabSelected === "players" ? (
        <Players mobile={mobile} />
      ) : (
        <Chat mobile={mobile} setfocus={setfocus} focus={focus} />
      )}
      <div style={styles.buttonsRow}>
        <div
          style={{
            ...styles.button,
            background: tabSelected === "players" ? "#D95A11" : "#fff",
            color: tabSelected === "players" ? "#fff" : "#D95A11",
          }}
          onMouseDown={() => setTabSelected("players")}
        >
          <h3>Players</h3>
        </div>
        <div
          style={{
            ...styles.button,
            background: tabSelected === "feed" ? "#D95A11" : "#fff",
            color: tabSelected === "feed" ? "#fff" : "#D95A11",
          }}
          onMouseDown={() => setTabSelected("feed")}
        >
          <h3>Feed</h3>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(SocialContainer);
