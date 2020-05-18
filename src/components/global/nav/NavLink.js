import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const NavLink = ({ text, route, ...props }) => {
  const history = useHistory();

  const [hover, setHover] = useState(false);

  const styles = {
    link: {
      fontSize: "1rem",
      cursor: "pointer",
    },
    linkContainer: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
    },
    underline: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 5,
      transform: hover ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left",
      transition: "0.25s linear",
      background: "#D94711",
    },
  };

  return (
    <div
      style={styles.linkContainer}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onMouseDown={() => (route ? history.push(route) : null)}
      {...props}
    >
      <p style={styles.link}>{text}</p>
      <span style={styles.underline} />
    </div>
  );
};

export default NavLink;
