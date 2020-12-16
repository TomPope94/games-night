import React from "react";

const GameRoundOption = ({ text, ...props }) => {
  const styles = {
    optionContainer: {
      padding: 10,
      borderRadius: 5,
      background: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  return (
    <div style={styles.optionContainer}>
      <h3>Text</h3>
    </div>
  );
};

export default GameRoundOption;
